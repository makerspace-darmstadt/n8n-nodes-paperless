import type { INodeProperties } from 'n8n-workflow';
import { makePaginationOptions } from './options';
import { documentTypeExpressions } from './utils';

export const documentTypeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['documentType'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'createDocumentType',
				action: 'Create a document type',
				routing: {
					request: {
						method: 'POST',
						url: '/document_types/',
						body: documentTypeExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: 'Delete',
				value: 'deleteDocumentType',
				action: 'Delete a document type',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/document_types/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get all document types',
				routing: {
					request: {
						method: 'GET',
						url: '/document_types/',
						qs: documentTypeExpressions.query,
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getDocumentTypeById',
				action: 'Get document type by id',
				routing: {
					request: {
						method: 'GET',
						url: '=/document_types/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Update',
				value: 'updateDocumentType',
				action: 'Update a document type replace all fields',
				routing: {
					request: {
						method: 'PUT',
						url: '=/document_types/{{$parameter.id}}/',
						body: documentTypeExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: 'Partial Update',
				value: 'partialUpdateDocumentType',
				action: 'Partially update a document type update specific fields',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/document_types/{{$parameter.id}}/',
						body: documentTypeExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
		],
		default: 'get',
	},
	// Include pagination options for the get operation
	...makePaginationOptions('documentType'),

	// Parameters for Create Document Type operation
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['documentType'],
				operation: ['createDocumentType', 'updateDocumentType'],
			},
		},
		default: '',
		description: 'The name of the document type',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['documentType'],
				operation: ['partialUpdateDocumentType'],
			},
		},
		default: undefined,
		description: 'The name of the document type (optional for partial update)',
	},
	{
		displayName: 'Match',
		name: 'match',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['documentType'],
				operation: ['createDocumentType', 'updateDocumentType', 'partialUpdateDocumentType'],
			},
		},
		default: undefined,
		description:
			'A string that paperless will try to match against the content of documents to automatically assign this document type',
	},
	{
		displayName: 'Matching Algorithm',
		name: 'matchingAlgorithm',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['documentType'],
				operation: ['createDocumentType', 'updateDocumentType', 'partialUpdateDocumentType'],
			},
		},
		options: [
			{
				name: 'None',
				value: 0,
				description: 'Do not match documents to this document type automatically',
			},
			{
				name: 'Any',
				value: 1,
				description: 'Match any occurrence of any word provided in the match string',
			},
			{
				name: 'All',
				value: 2,
				description: 'Match all words provided in the match string',
			},
			{
				name: 'Literal',
				value: 3,
				description: 'Match the literal string provided in the match string',
			},
			{
				name: 'Regular Expression',
				value: 4,
				description: 'Match using regular expression',
			},
			{
				name: 'Fuzzy Match',
				value: 5,
				description: 'Match using fuzzy string matching',
			},
			{
				name: 'Auto',
				value: 6,
				description: 'Let paperless determine the best matching algorithm',
			},
		],
		default: 0,
		description: 'The algorithm used to match documents to this document type',
	},
	{
		displayName: 'Case Insensitive',
		name: 'isInsensitive',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['documentType'],
				operation: ['createDocumentType', 'updateDocumentType', 'partialUpdateDocumentType'],
			},
		},
		default: false,
		description: 'Whether matching should be case insensitive',
	},

	// Ownership and permissions
	{
		displayName: 'Owner User ID',
		name: 'owner',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['documentType'],
				operation: ['createDocumentType', 'updateDocumentType', 'partialUpdateDocumentType'],
			},
		},
		default: undefined,
		description: 'Numeric user ID to set as owner of this document type',
	},
	{
		displayName: 'Set Permissions',
		name: 'setPermissions',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['documentType'],
				operation: ['createDocumentType', 'updateDocumentType', 'partialUpdateDocumentType'],
			},
		},
		default: '{"view":{"users":[],"groups":[]},"change":{"users":[],"groups":[]}}',
		description:
			'Permissions object: {"view":{"users":[],"groups":[]},"change":{"users":[],"groups":[]}}',
	},
	{
		displayName: 'Note',
		name: 'permissionsNote',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['documentType'],
				operation: ['createDocumentType', 'updateDocumentType', 'partialUpdateDocumentType'],
			},
		},
		default:
			'Use the Users and Groups endpoints to look up IDs to use for owner and set_permissions. No user/group create/update/delete provided by this node.',
	},

	// Parameter for primary ID
	{
		displayName: 'Document Type ID',
		name: 'id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['documentType'],
				operation: [
					'deleteDocumentType',
					'getDocumentTypeById',
					'updateDocumentType',
					'partialUpdateDocumentType',
					'get',
				],
			},
		},
		default: null,
		description: 'The ID of the document type to delete, get, or update',
	},

	// Filtering Parameters for Get All Document Types operation
	{
		displayName: 'Full Permissions',
		name: 'fullPerms',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['documentType'],
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
				resource: ['documentType'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter document types by multiple IDs (comma-separated)',
	},
	{
		displayName: 'Name Contains',
		name: 'nameContains',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['documentType'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter document types where name contains this text (case-insensitive)',
	},
	{
		displayName: 'Name Ends With',
		name: 'nameEndsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['documentType'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter document types where name ends with this text (case-insensitive)',
	},
	{
		displayName: 'Name Exact Match',
		name: 'nameExact',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['documentType'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter document types where name exactly matches this text (case-insensitive)',
	},
	{
		displayName: 'Name Starts With',
		name: 'nameStartsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['documentType'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter document types where name starts with this text (case-insensitive)',
	},
];
