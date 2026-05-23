<script lang="ts">
	import type { ExamResult } from '$lib/types';
	import type { PageProps } from './$types';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Typography from '$lib/components/Typography/Typography.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import { paths } from '$lib/constants/paths';
	import ExamQuizCard from '$lib/components/ExamQuizCard/ExamQuizCard.svelte';
	import Progress from '$lib/components/Progress/Progress.svelte';
	import Inner from '$lib/components/Inner/Inner.svelte';
	import SkipButton from '$lib/components/SkipButton/SkipButton.svelte';
	import ScoreCard from '$lib/components/ScoreCard/ScoreCard.svelte';
	import ExamQuestionCard from '$lib/components/ExamQuestionCard/ExamQuestionCard.svelte';
	import Crumbs from '$lib/components/Crumbs/Crumbs.svelte';

	let props: PageProps = $props();
	const exam = $derived(props.data.exam);
	const questions = $derived(exam.questions);
	const total = $derived(questions?.length ?? 0);

	let currentIndex = $state(0);
	let results: ExamResult[] = $state([]);
	let selectedOptionIndex = $state<number | undefined>(undefined);

	const currentQuestion = $derived(questions?.[currentIndex]);
	const isFinished = $derived(currentIndex >= total);
	const correctCount = $derived(results.filter((r) => r.correct).length);

	function selectOption(optionIndex: number) {
		if (selectedOptionIndex !== undefined) return;
		selectedOptionIndex = optionIndex;
		const correct = currentQuestion?.options?.[optionIndex]?.isCorrect ?? false;
		results = [
			...results,
			{ question: currentQuestion, selectedOptionIndex: optionIndex, correct }
		];
	}

	function skipQuestion() {
		if (selectedOptionIndex !== undefined) return;
		results = [...results, { question: currentQuestion, selectedOptionIndex: -1, correct: false }];
		advance();
	}

	function advance() {
		currentIndex++;
		selectedOptionIndex = undefined;
	}
</script>

<Inner>
	{#if exam.title}
		<Crumbs
			items={[
				{ text: exam.title, href: paths.exam(exam.id) },
				{ text: '試験', href: paths.examLesson(exam.id) }
			]}
		/>
	{/if}
	{#if !isFinished}
		<Stack size={3} variant="section">
			<Stack size={1} variant="div">
				<Typography size={2} variant="p" color="dark" weight="bold" align="center">
					{currentIndex + 1} / {total}
				</Typography>
				<Progress value={currentIndex} max={total} />
			</Stack>
			{#key currentIndex}
				{#if currentQuestion}
					<ExamQuizCard
						question={currentQuestion}
						onSelect={selectOption}
						selectedIndex={selectedOptionIndex}
					/>
				{/if}
			{/key}
			{#if selectedOptionIndex !== undefined}
				<Button variant="button" color="success" onclick={advance}>次へ進む</Button>
			{/if}
			{#if selectedOptionIndex === undefined}
				<SkipButton onclick={skipQuestion} />
			{/if}
		</Stack>
	{:else}
		<Stack size={3} variant="section">
			<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
				結果
			</Typography>
			<ScoreCard score={correctCount} {total} />
			<Stack size={2} variant="ul">
				{#each results as result}
					{#if result.question}
						<ExamQuestionCard
							question={result.question}
							borderColor={result.correct ? 'success' : 'warning'}
						/>
					{/if}
				{/each}
			</Stack>
			<Button variant="a" color="secondary" href={paths.exam(exam.id)}>戻る</Button>
		</Stack>
	{/if}
</Inner>
