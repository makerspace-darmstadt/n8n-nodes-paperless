import type { INodeProperties } from 'n8n-workflow';
import { makePaginationOptions } from './options';
import { customFieldExpressions } from './utils';

export const customFieldOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customField'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'createCustomField',
				action: 'Create a custom field',
				routing: {
					request: {
						method: 'POST',
						url: '/custom_fields/',
						body: customFieldExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: 'Delete',
				value: 'deleteCustomField',
				action: 'Delete a custom field',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/custom_fields/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get all custom fields',
				routing: {
					request: {
						method: 'GET',
						url: '/custom_fields/',
						qs: customFieldExpressions.query,
					},
				},
			},
			{
				name: 'Get by ID',
				value: 'getCustomFieldById',
				action: 'Get custom field by id',
				routing: {
					request: {
						method: 'GET',
						url: '=/custom_fields/{{$parameter.id}}/',
					},
				},
			},
			{
				name: 'Update',
				value: 'updateCustomField',
				action: 'Update a custom field replace all fields',
				routing: {
					request: {
						method: 'PUT',
						url: '=/custom_fields/{{$parameter.id}}/',
						body: customFieldExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
			{
				name: 'Partial Update',
				value: 'partialUpdateCustomField',
				action: 'Partially update a custom field update specific fields',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/custom_fields/{{$parameter.id}}/',
						body: customFieldExpressions.body,
						encoding: 'json',
						json: true,
					},
				},
			},
		],
		default: 'get',
	},
	// Include pagination options for the get operation
	...makePaginationOptions('customField'),

	// Parameters for Create Custom Field operation
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['createCustomField'],
			},
		},
		default: '',
		description: 'The name of the custom field',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['updateCustomField'],
			},
		},
		default: undefined,
		description: 'The name of the custom field (optional for update)',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['partialUpdateCustomField'],
			},
		},
		default: undefined,
		description: 'The name of the custom field (optional for partial update)',
	},
	{
		displayName: 'Data Type',
		name: 'dataType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['createCustomField'],
			},
		},
		options: [
			{
				name: 'Boolean',
				value: 'boolean',
				description: 'True/false value',
			},
			{
				name: 'Date',
				value: 'date',
				description: 'Date value',
			},
			{
				name: 'Document Link',
				value: 'documentlink',
				description: 'Link to another document',
			},
			{
				name: 'Float',
				value: 'float',
				description: 'Decimal number',
			},
			{
				name: 'Integer',
				value: 'integer',
				description: 'Whole number',
			},
			{
				name: 'Monetary',
				value: 'monetary',
				description: 'Currency/money value',
			},
			{
				name: 'Select',
				value: 'select',
				description: 'Selection from predefined options',
			},
			{
				name: 'String',
				value: 'string',
				description: 'Text string value',
			},
			{
				name: 'URL',
				value: 'url',
				description: 'URL/web address',
			},
		],
		default: 'string',
		description: 'The data type for the custom field',
	},
	{
		displayName: 'Select Options',
		name: 'selectOptions',
		type: 'fixedCollection',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['createCustomField'],
				dataType: ['select'],
			},
		},
		default: { values: [] },
		description: 'Options for the select field',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'values',
				displayName: 'Option',
				values: [
					{
						displayName: 'Label',
						name: 'label',
						type: 'string',
						required: true,
						default: '',
						description: 'The display label for this option',
					},
				],
			},
		],
	},
	{
		displayName: 'Extra Data',
		name: 'extraData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['createCustomField'],
				dataType: ['!select'],
			},
		},
		default: undefined,
		description: 'Additional data for the custom field',
	},

	// Ownership and permissions
	{
		displayName: 'Owner User ID',
		name: 'owner',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['createCustomField', 'updateCustomField', 'partialUpdateCustomField'],
			},
		},
		default: undefined,
		description: 'Numeric user ID to set as owner of this custom field',
	},
	{
		displayName: 'Set Permissions',
		name: 'setPermissions',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['createCustomField', 'updateCustomField', 'partialUpdateCustomField'],
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
				resource: ['customField'],
				operation: ['createCustomField', 'updateCustomField', 'partialUpdateCustomField'],
			},
		},
		default:
			'Use the Users and Groups endpoints to look up IDs to use for owner and set_permissions. No user/group create/update/delete provided by this node.',
	},

	// Parameter for primary ID
	{
		displayName: 'Custom Field ID',
		name: 'id',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: [
					'deleteCustomField',
					'getCustomFieldById',
					'updateCustomField',
					'partialUpdateCustomField',
					'get',
				],
			},
		},
		default: null,
		description: 'The ID of the custom field to delete, get, or update',
	},

	// Filtering Parameters for Get All Custom Fields operation
	{
		displayName: 'Filter by IDs',
		name: 'filterIdIn',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter custom fields by multiple IDs (comma-separated)',
	},
	{
		displayName: 'Name Contains',
		name: 'nameContains',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter custom fields where name contains this text (case-insensitive)',
	},
	{
		displayName: 'Name Ends With',
		name: 'nameEndsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter custom fields where name ends with this text (case-insensitive)',
	},
	{
		displayName: 'Name Exact Match',
		name: 'nameExact',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter custom fields where name exactly matches this text (case-insensitive)',
	},
	{
		displayName: 'Name Starts With',
		name: 'nameStartsWith',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customField'],
				operation: ['get'],
			},
		},
		default: undefined,
		description: 'Filter custom fields where name starts with this text (case-insensitive)',
	},
];
