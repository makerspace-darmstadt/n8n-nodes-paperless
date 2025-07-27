import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { correspondentOperations } from './operations/correspondent';
import { documentTypeOperations } from './operations/documentType';
import { storagePathOperations } from './operations/storagePath';
import { tagOperations } from './operations/tag';
import { customFieldOperations } from './operations/customField';

export class PaperlessNgx implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		displayName: 'Paperless NGX',
		name: 'paperlessNgx',
		icon: 'file:paperlessngx.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the Paperless NGX API ',
		defaults: {
			name: 'Paperless NGX',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'paperlessNgxApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.instanceUrl.replace(new RegExp("/$"), "") + "/api"}}',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			// Resources and operations will go here
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Correspondent',
						value: 'correspondent',
					},
					{
						name: 'Custom Field',
						value: 'customField',
					},
					{
						name: 'Document Type',
						value: 'documentType',
					},
					{
						name: 'Storage Path',
						value: 'storagePath',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
				],
				default: 'correspondent',
			},
			...correspondentOperations,
			...documentTypeOperations,
			...storagePathOperations,
			...tagOperations,
			...customFieldOperations,
		],
	};
}
