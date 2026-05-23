<script lang="ts">
	import { browser } from '$app/environment';
	import type { LessonResult, Phrase } from '$lib/types';
	import type { PageProps } from './$types';
	import { orderItemsByIndices, pickRandomItems } from '$lib/lesson';
	import { loadLessonIndices } from '$lib/lessonSession';
	import Stack from '$lib/components/Stack/Stack.svelte';
	import Typography from '$lib/components/Typography/Typography.svelte';
	import Button from '$lib/components/Button/Button.svelte';
	import { paths } from '$lib/constants/paths';
	import QuestionCard from '$lib/components/QuestionCard/QuestionCard.svelte';
	import Progress from '$lib/components/Progress/Progress.svelte';
	import Inner from '$lib/components/Inner/Inner.svelte';
	import SkipButton from '$lib/components/SkipButton/SkipButton.svelte';
	import ScoreCard from '$lib/components/ScoreCard/ScoreCard.svelte';
	import Input from '$lib/components/Input/Input.svelte';
	import PhraseCard from '$lib/components/PhraseCard/PhraseCard.svelte';
	import Card from '$lib/components/Card/Card.svelte';
	import Crumbs from '$lib/components/Crumbs/Crumbs.svelte';

	let props: PageProps = $props();
	const situation = $derived(props.data.situation);
	const allPhrases = $derived(situation.phrases ?? []);

	let phrases: Phrase[] = $state([]);

	$effect(() => {
		if (!browser) return;
		const indices = loadLessonIndices(situation.id);
		phrases =
			indices && indices.length > 0
				? orderItemsByIndices(allPhrases, indices)
				: pickRandomItems(allPhrases);
	});

	const total = $derived(phrases.length);

	let currentIndex = $state(0);
	let userInput = $state('');
	let results: LessonResult[] = $state([]);
	let isCorrect = $state(false);
	let showAnswer = $state(false);

	const currentPhrase = $derived(phrases[currentIndex]);
	const isFinished = $derived(currentIndex >= total);
	const correctCount = $derived(results.filter((r) => r.correct).length);

	function checkInput() {
		if (currentPhrase.phrase !== undefined && userInput === currentPhrase.phrase) {
			results.push({ phrase: currentPhrase, correct: true });
			isCorrect = true;
		}
	}

	function skipPhrase() {
		results.push({ phrase: currentPhrase, correct: false });
		advance();
	}

	function advance() {
		currentIndex++;
		userInput = '';
		isCorrect = false;
		showAnswer = false;
	}
</script>

<Inner>
	<Crumbs
		items={[
			{ text: situation.title ?? '', href: paths.situation(situation.id) },
			{ text: 'レッスン', href: paths.lesson(situation.id) }
		]}
	/>
	{#if browser && phrases.length > 0 && !isFinished}
		<Stack size={3} variant="section">
			<Stack size={1} variant="div">
				<Typography size={2} variant="p" color="dark" weight="bold" align="center">
					{currentIndex + 1} / {total}
				</Typography>
				<Progress value={currentIndex} max={total} />
			</Stack>
			<QuestionCard meaning={currentPhrase.meaning} phrase={currentPhrase.phrase} bind:showAnswer />
			<Input {isCorrect} bind:userInput handleInput={checkInput} />
			{#if isCorrect}
				<Button variant="button" color="success" onclick={advance}>次へ進む</Button>
			{/if}
			{#if !isCorrect}
				<SkipButton onclick={skipPhrase} />
			{/if}
		</Stack>
	{:else if browser && phrases.length > 0}
		<Stack size={3} variant="section">
			<Typography size={5} variant="h1" color="secondary" weight="bold" align="center">
				結果
			</Typography>
			<ScoreCard score={correctCount} {total} />
			<Stack size={2} variant="ul">
				{#each results as result}
					<Card
						variant="li"
						borderColor={result.correct ? 'success' : 'warning'}
						hasBorderLeft={true}
					>
						<PhraseCard phrase={result.phrase} />
					</Card>
				{/each}
			</Stack>
			<Button variant="a" color="secondary" href={paths.situation(situation.id)}>戻る</Button>
		</Stack>
	{/if}
</Inner>
