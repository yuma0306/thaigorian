const PCM_SAMPLE_RATE = 24000;
const PCM_CHANNELS = 1;
const PCM_BIT_DEPTH = 16;

export function pcmToWav(pcm: Buffer): Buffer {
	const blockAlign = (PCM_CHANNELS * PCM_BIT_DEPTH) / 8;
	const byteRate = PCM_SAMPLE_RATE * blockAlign;
	const header = Buffer.alloc(44);

	header.write('RIFF', 0);
	header.writeUInt32LE(36 + pcm.length, 4);
	header.write('WAVE', 8);
	header.write('fmt ', 12);
	header.writeUInt32LE(16, 16);
	header.writeUInt16LE(1, 20);
	header.writeUInt16LE(PCM_CHANNELS, 22);
	header.writeUInt32LE(PCM_SAMPLE_RATE, 24);
	header.writeUInt32LE(byteRate, 28);
	header.writeUInt16LE(blockAlign, 32);
	header.writeUInt16LE(PCM_BIT_DEPTH, 34);
	header.write('data', 36);
	header.writeUInt32LE(pcm.length, 40);

	return Buffer.concat([header, pcm]);
}
