/**
 * Utility functions and expressions for n8n node operations
 */

/**
 * Filters out null, undefined, and empty string values from an object
 * This is useful for API requests where you only want to send defined parameters
 */
export const filterDefinedValues = (obj: Record<string, any>): Record<string, any> => {
	return Object.fromEntries(
		Object.entries(obj).filter(
			([_, value]) =>
				value !== null &&
				value !== undefined &&
				value !== '' &&
				// For arrays, check if they're not empty
				!(Array.isArray(value) && value.length === 0),
		),
	);
};

/**
 * Expression string for filtering defined values in n8n routing
 * This can be used in routing body expressions
 */
export const createFilteredBodyExpression = (parameterMap: Record<string, string>): string => {
	const parameterEntries = Object.entries(parameterMap)
		.map(([key, paramName]) => `"${key}": $parameter.${paramName}`)
		.join(', ');

	return `={{ Object.fromEntries(Object.entries({${parameterEntries}}).filter(([key, value]) => value !== null && value !== undefined && value !== "")) }}`;
};

/**
 * Expression string for filtering query parameters in n8n routing
 */
export const createFilteredQueryExpression = (
	parameterMap: Record<string, string>,
): Record<string, string> => {
	const result: Record<string, string> = {};

	for (const [queryParam, nodeParam] of Object.entries(parameterMap)) {
		result[queryParam] = `={{$parameter.${nodeParam} || undefined}}`;
	}

	return result;
};

/**
 * Helper function to create query expressions with common parameters
 * @param resourceSpecificParams - Parameters specific to the resource (e.g., name filters)
 * @param includePermissions - Whether to include permission parameters (default: false, since not all resources have this)
 * @param includeIdFiltering - Whether to include ID filtering parameters (default: true)
 */
export const createResourceQueryExpression = (
	resourceSpecificParams: Record<string, string> = {},
	includePermissions: boolean = false,
	includeIdFiltering: boolean = true,
): Record<string, string> => {
	const params = {
		...commonParameterMappings.pagination,
		...(includePermissions ? commonParameterMappings.resourceSpecific.permissions : {}),
		...(includeIdFiltering ? commonParameterMappings.idFiltering : {}),
		...resourceSpecificParams,
	};

	return createFilteredQueryExpression(params);
};

/**
 * Convenience function for resources with standard name filtering
 * @param includePermissions - Whether to include permission parameters
 * @param additionalParams - Any additional resource-specific parameters
 */
export const createNameFilteredResourceExpression = (
	includePermissions: boolean = false,
	additionalParams: Record<string, string> = {},
): Record<string, string> => {
	return createResourceQueryExpression(
		{
			...commonParameterMappings.resourceSpecific.nameFiltering,
			...additionalParams,
		},
		includePermissions,
	);
};

/**
 * Predefined parameter mappings for reusability
 */
export const commonParameterMappings = {
	// Common pagination and ordering parameters used across all resources
	pagination: {
		page_size: 'pageSize',
		page: 'page',
		ordering: 'sortBy',
	},

	// Common ID filtering parameters
	idFiltering: {
		id: 'id',
		id__in: 'filterIdIn',
	},

	// Resource-specific parameter mappings
	resourceSpecific: {
		// Permission parameter (only for some resources like correspondents, document_types)
		permissions: {
			full_perms: 'fullPerms',
		},

		// Common name filtering (for resources that have name fields)
		nameFiltering: {
			name__icontains: 'nameContains',
			name__iendswith: 'nameEndsWith',
			name__iexact: 'nameExact',
			name__istartswith: 'nameStartsWith',
		},
	},
};

/**
 * Predefined expressions for common correspondent operations
 */
export const correspondentExpressions = {
	// Body expression for create/update operations
	body:
		`={{Object.fromEntries(Object.entries({
			name: $parameter.name,
			match: $parameter.match,
			matching_algorithm: $parameter.matchingAlgorithm,
			is_insensitive: $parameter.isInsensitive,
			owner: $parameter.owner,
			set_permissions: (typeof $parameter.setPermissions === 'string' && $parameter.setPermissions.trim() !== "") ? JSON.parse($parameter.setPermissions) : undefined,
		}).filter(([key, value]) => value !== null && value !== undefined && value !== ""))}}`,

	// Query string parameters for get operations (correspondents have permissions and name filtering)
	query: createNameFilteredResourceExpression(true),
};

/**
 * Predefined expressions for document type operations
 */
export const documentTypeExpressions = {
	// Body expression for create/update operations
	body:
		`={{Object.fromEntries(Object.entries({
			name: $parameter.name,
			match: $parameter.match,
			matching_algorithm: $parameter.matchingAlgorithm,
			is_insensitive: $parameter.isInsensitive,
			owner: $parameter.owner,
			set_permissions: (typeof $parameter.setPermissions === 'string' ? ($parameter.setPermissions.trim() ? JSON.parse($parameter.setPermissions) : undefined) : $parameter.setPermissions),
		}).filter(([key, value]) => value !== null && value !== undefined && value !== ""))}}`,

	// Query string parameters for get operations (document types have permissions and name filtering)
	query: createNameFilteredResourceExpression(true),
};

/**
 * Predefined expressions for storage path operations
 */
export const storagePathExpressions = {
	// Body expression for create/update operations
	body:
		`={{Object.fromEntries(Object.entries({
			name: $parameter.name,
			path: $parameter.path,
			match: $parameter.match,
			matching_algorithm: $parameter.matchingAlgorithm,
			is_insensitive: $parameter.isInsensitive,
			owner: $parameter.owner,
			set_permissions: (typeof $parameter.setPermissions === 'string' ? ($parameter.setPermissions.trim() ? JSON.parse($parameter.setPermissions) : undefined) : $parameter.setPermissions),
		}).filter(([key, value]) => value !== null && value !== undefined && value !== ""))}}`,

	// Query string parameters for get operations (storage paths have permissions and name/path filtering)
	query: createResourceQueryExpression(
		{
			...commonParameterMappings.resourceSpecific.nameFiltering,
			path__icontains: 'pathContains',
			path__iendswith: 'pathEndsWith',
			path__iexact: 'pathExact',
			path__istartswith: 'pathStartsWith',
		},
		true,
	),
};

/**
 * Predefined expressions for tag operations
 */
export const tagExpressions = {
	// Body expression for create/update operations
	body:
		`={{Object.fromEntries(Object.entries({
			name: $parameter.name,
			color: $parameter.color,
			match: $parameter.match,
			matching_algorithm: $parameter.matchingAlgorithm,
			is_insensitive: $parameter.isInsensitive,
			is_inbox_tag: $parameter.isInboxTag,
			owner: $parameter.owner,
			set_permissions: (typeof $parameter.setPermissions === 'string' ? ($parameter.setPermissions.trim() ? JSON.parse($parameter.setPermissions) : undefined) : $parameter.setPermissions),
		}).filter(([key, value]) => value !== null && value !== undefined && value !== ""))}}`,

	// Query string parameters for get operations (tags have permissions and name filtering)
	query: createNameFilteredResourceExpression(true),
};

/**
 * Predefined expressions for custom field operations
 */
export const customFieldExpressions = {
	// Body expression for create/update operations with special handling for select fields
	body:
		`={{Object.fromEntries(Object.entries({
			name: $parameter.name,
			data_type: $parameter.dataType,
			extra_data: $parameter.dataType === 'select' && $parameter.selectOptions ? {select_options: $parameter.selectOptions.values || []} : $parameter.extraData,
			owner: $parameter.owner,
			set_permissions: (typeof $parameter.setPermissions === 'string' ? ($parameter.setPermissions.trim() ? JSON.parse($parameter.setPermissions) : undefined) : $parameter.setPermissions),
		}).filter(([key, value]) => value !== null && value !== undefined && value !== ""))}}`,

	// Query string parameters for get operations (custom fields have name filtering but no permissions)
	query: createNameFilteredResourceExpression(false),
};
