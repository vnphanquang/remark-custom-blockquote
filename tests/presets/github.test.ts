import { describe, test } from 'vitest';

import { RemarkTransformBlockquoteOptions } from '../../src';
import { html, markdown, matchStringIgnoringWhitespace, processWithPlugin } from '../utils';

const NOTE = markdown`
	> [!NOTE]
	> Useful information that users should know, even when skimming content.
`;
const TIP = markdown`
	> [!TIP]
	> Helpful advice for doing things better or more easily.
`;
const IMPORTANT = markdown`
	> [!IMPORTANT]
	> Key information users need to know to achieve their goal.
`;
const WARNING = markdown`
	> [!WARNING]
	> Urgent info that needs immediate user attention to avoid problems.
`;
const CAUTION = markdown`
	> [!CAUTION]
	> Advises about risks or negative outcomes of certain actions.
`;

const options: RemarkTransformBlockquoteOptions = {
	preset: 'github',
};

describe('should transform matching blockquote', () => {
	test('NOTE', async () => {
		const output = await processWithPlugin(NOTE, options);
		matchStringIgnoringWhitespace(
			output,
			html`
				<div class="markdown-alert markdown-alert-note" data-title="Note">
					<p>Useful information that users should know, even when skimming content.</p>
				</div>
		`,
		);
	});

	test('TIP', async () => {
		const output = await processWithPlugin(TIP, options);
		matchStringIgnoringWhitespace(
			output,
			html`
				<div class="markdown-alert markdown-alert-tip" data-title="Tip">
					<p>Helpful advice for doing things better or more easily.</p>
				</div>
		`,
		);
	});

	test('IMPORTANT', async () => {
		const output = await processWithPlugin(IMPORTANT, options);
		matchStringIgnoringWhitespace(
			output,
			html`
				<div class="markdown-alert markdown-alert-important" data-title="Important">
					<p>Key information users need to know to achieve their goal.</p>
				</div>
		`,
		);
	});

	test('WARNING', async () => {
		const output = await processWithPlugin(WARNING, options);
		matchStringIgnoringWhitespace(
			output,
			html`
				<div class="markdown-alert markdown-alert-warning" data-title="Warning">
					<p>Urgent info that needs immediate user attention to avoid problems.</p>
				</div>
		`,
		);
	});

	test('CAUTION', async () => {
		const output = await processWithPlugin(CAUTION, options);
		matchStringIgnoringWhitespace(
			output,
			html`
				<div class="markdown-alert markdown-alert-caution" data-title="Caution">
					<p>Advises about risks or negative outcomes of certain actions.</p>
				</div>
		`,
		);
	});
});
