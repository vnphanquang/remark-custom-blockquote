import { describe, test } from 'vitest';

import { RemarkTransformBlockquoteOptions } from '../../src';
import { html, markdown, matchStringIgnoringWhitespace, processWithPlugin } from '../utils';

const INFO = markdown`
	> [!INFO]
	> General information that users should know.
`;

const SUCCESS = markdown`
	> [!SUCCESS]
	> Indicates a successful or positive action.
`;

const WARNING = markdown`
	> [!WARNING]
	> Urgent info that needs immediate user attention to avoid problems.
`;

const options: RemarkTransformBlockquoteOptions = {
	preset: 'comeau',
};

describe('should transform matching blockquote', () => {
	test('INFO', async () => {
		const output = await processWithPlugin(INFO, options);
		matchStringIgnoringWhitespace(
			output,
			html`
				<div class="callout callout-info">
					<p>General information that users should know.</p>
				</div>
		`,
		);
	});

	test('SUCCESS', async () => {
		const output = await processWithPlugin(SUCCESS, options);
		matchStringIgnoringWhitespace(
			output,
			html`
				<div class="callout callout-success">
					<p>Indicates a successful or positive action.</p>
				</div>
		`,
		);
	});

	test('WARNING', async () => {
		const output = await processWithPlugin(WARNING, options);
		matchStringIgnoringWhitespace(
			output,
			html`
				<div class="callout callout-warning">
					<p>Urgent info that needs immediate user attention to avoid problems.</p>
				</div>
		`,
		);
	});
});
