import type { INodeProperties } from 'n8n-workflow';
import { paginationOptions } from './options';

export const correspondentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['correspondent'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'createCorrespondent',
				action: 'Create a correspondent',
				routing: {
					request: {
						method: 'POST',
						url: '/correspondents/',
						body: '={{ Object.fromEntries(Object.entries({"name": $parameter.name, "match": $parameter.match, "matching_algorithm": $parameter.matchingAlgorithm, "is_insensitive": $parameter.isInsensitive}).filter(([key, value]) => value !== null && value !== undefined && value !== "")) }}',
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: 'Delete',
				value: 'deleteCorrespondent',
				action: 'Delete a correspondent',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/correspondents/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get all correspondents',
				routing: {
					request: {
						method: 'GET',
						url: '/correspondents/',
						qs: {
							page_size: '={{$parameter.pageSize || undefined}}',
							page: '={{$parameter.page || undefined}}',
							ordering: '={{$parameter.sortBy || undefined}}',
							full_perms: '={{$parameter.fullPerms !== null ? $parameter.fullPerms : undefined}}',
							id: '={{$parameter.id !== 0 ? $parameter.id : undefined}}',
							id__in: '={{$parameter.filterIdIn || undefined}}',
							name__icontains: '={{$parameter.nameContains || undefined}}',
							name__iendswith: '={{$parameter.nameEndsWith || undefined}}',
							name__iexact: '={{$parameter.nameExact || undefined}}',
							name__istartswith: '={{$parameter.nameStartsWith || undefined}}',
						},
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getCorrespondentById',
				action: 'Get correspondent by id',
				routing: {
					request: {
						method: 'GET',
						url: '=/correspondents/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Update',
				value: 'updateCorrespondent',
				action: 'Update a correspondent (replace all fields)',
				routing: {
					request: {
						method: 'PUT',
						url: '=/correspondents/{{$parameter.id}}/',
						body: '={{ Object.fromEntries(Object.entries({"name": $parameter.name, "match": $parameter.match, "matching_algorithm": $parameter.matchingAlgorithm, "is_insensitive": $parameter.isInsensitive}).filter(([key, value]) => value !== null && value !== undefined && value !== "")) }}',
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: 'Partial Update',
				value: 'partialUpdateCorrespondent',
				action: 'Partially update a correspondent (update specific fields)',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/correspondents/{{$parameter.id}}/',
						body: '={{ Object.fromEntries(Object.entries({"name": $parameter.name, "match": $parameter.match, "matching_algorithm": $parameter.matchingAlgorithm, "is_insensitive": $parameter.isInsensitive}).filter(([key, value]) => value !== null && value !== undefined && value !== "")) }}',
						encoding: 'json',
						json: true,
					},
				},
			},
		],
		default: 'get',
	},
	// Include pagination options for the get operation
	...paginationOptions,

	// Parameters for Create Correspondent operation
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['createCorrespondent', 'updateCorrespondent'],
			},
		},
		default: '',
		description: 'The name of the correspondent',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: false,
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['partialUpdateCorrespondent'],
			},
		},
		default: undefined,
		description: 'The name of the correspondent (optional for partial update)',
	},
	{
		displayName: 'Match',
		name: 'match',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['createCorrespondent', 'updateCorrespondent', 'partialUpdateCorrespondent'],
			},
		},
		default: undefined,
		description:
			'A string that paperless will try to match against the content of documents to automatically assign this correspondent',
	},
	{
		displayName: 'Matching Algorithm',
		name: 'matchingAlgorithm',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['createCorrespondent', 'updateCorrespondent', 'partialUpdateCorrespondent'],
			},
		},
		options: [
			{
				name: 'None',
				value: 0,
				description: 'Do not match documents to this correspondent automatically',
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
		default: undefined,
		description: 'The algorithm used to match documents to this correspondent',
	},
	{
		displayName: 'Case Insensitive',
		name: 'isInsensitive',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['createCorrespondent', 'updateCorrespondent', 'partialUpdateCorrespondent'],
			},
		},
		default: undefined,
		description: 'Whether matching should be case insensitive',
	},

	// Parameter for primary ID
	{
		displayName: 'Correspondent ID',
		name: 'id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: [
					'deleteCorrespondent',
					'getCorrespondentById',
					'updateCorrespondent',
					'partialUpdateCorrespondent',
					'get',
				],
			},
		},
		default: 0,
		description: 'The ID of the correspondent to delete, get, or update',
	},

	// Filtering Parameters for Get All Correspondents operation
	{
		displayName: 'Full Permissions',
		name: 'fullPerms',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Whether to include full permission information',
	},
	{
		displayName: 'Filter by IDs',
		name: 'filterIdIn',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter correspondents by multiple IDs (comma-separated)',
	},
	{
		displayName: 'Name Contains',
		name: 'nameContains',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter correspondents where name contains this text (case-insensitive)',
	},
	{
		displayName: 'Name Ends With',
		name: 'nameEndsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter correspondents where name ends with this text (case-insensitive)',
	},
	{
		displayName: 'Name Exact Match',
		name: 'nameExact',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter correspondents where name exactly matches this text (case-insensitive)',
	},
	{
		displayName: 'Name Starts With',
		name: 'nameStartsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['correspondent'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter correspondents where name starts with this text (case-insensitive)',
	},
];
