import type { INodeProperties } from 'n8n-workflow';
import { makePaginationOptions } from './options';
import { documentExpressions } from './utils';

export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
		options: [
			{
				name: 'Delete',
				value: 'deleteDocument',
				action: 'Delete a document',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/documents/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get all documents',
				routing: {
					request: {
						method: 'GET',
						url: '/documents/',
						qs: documentExpressions.query,
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getDocumentById',
				action: 'Get document by id',
				routing: {
					request: {
						method: 'GET',
						url: '=/documents/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Download',
				value: 'downloadDocument',
				action: 'Download document file',
				routing: {
					request: {
						method: 'GET',
						url: '=/documents/{{$parameter.id}}/download/',
						encoding: 'arraybuffer',
					},
					output: {
						postReceive: [
							{
								type: 'binaryData',
								properties: {
									destinationProperty: 'data',
								},
							},
						],
					},
				},
			},
		],
		default: 'get',
	},
	// Include pagination options for the get operation
	...makePaginationOptions('document'),

	// Parameter for primary ID
	{
		displayName: 'Document ID',
		name: 'id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: [
					'deleteDocument',
					'getDocumentById',
					'downloadDocument',
				],
			},
		},
		default: null,
		description: 'The ID of the document to delete, get, update, or download',
	},

	// Filtering Parameters for Get All Documents operation
	{
		displayName: 'Full Permissions',
		name: 'fullPerms',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		default: false,
		description: 'Whether to include full permission information',
	},
	{
		displayName: 'Filter by IDs',
		name: 'filterIdIn',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter documents by multiple IDs (comma-separated)',
	},
	{
		displayName: 'Title Contains',
		name: 'titleContains',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter documents where title contains this text (case-insensitive)',
	},
	{
		displayName: 'Content Contains',
		name: 'contentContains',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter documents where content contains this text (case-insensitive)',
	},
	{
		displayName: 'Tags (IDs)',
		name: 'tagsIn',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter documents by tag IDs (comma-separated)',
	},
	{
		displayName: 'Document Type ID',
		name: 'documentTypeId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter documents by document type ID',
	},
	{
		displayName: 'Correspondent ID',
		name: 'correspondentId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter documents by correspondent ID',
	},
	{
		displayName: 'Storage Path ID',
		name: 'storagePathId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter documents by storage path ID',
	},
	{
		displayName: 'ASN Contains',
		name: 'asnContains',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter documents where archive serial number contains this text',
	},
	{
		displayName: 'Created After',
		name: 'createdAfter',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter documents created after this date',
	},
	{
		displayName: 'Created Before',
		name: 'createdBefore',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter documents created before this date',
	},
	{
		displayName: 'Modified After',
		name: 'modifiedAfter',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter documents modified after this date',
	},
	{
		displayName: 'Modified Before',
		name: 'modifiedBefore',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter documents modified before this date',
	},
];
