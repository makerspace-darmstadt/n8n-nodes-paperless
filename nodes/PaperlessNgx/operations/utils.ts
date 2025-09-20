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
		...(includePermissions ? commonParameterMappings.permissions : {}),
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
			...commonParameterMappings.nameFiltering,
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
};

/**
 * Predefined expressions for common correspondent operations
 */
export const correspondentExpressions = {
	// Body expression for create/update operations
	body: `={{Object.fromEntries(Object.entries({
			name: $parameter.name,
			match: $parameter.match,
			matching_algorithm: $parameter.matchingAlgorithm,
			is_insensitive: $parameter.isInsensitive,
			owner: $parameter.owner,
			set_permissions: typeof $parameter.setPermissions === 'string' && $parameter.setPermissions.isNotEmpty() ? $parameter.setPermissions.parseJson() : undefined,
		}).filter(([_, v]) => v !== null && v !== undefined && v !== ""))}}`,

	// Query string parameters for get operations (correspondents have permissions and name filtering)
	query: createNameFilteredResourceExpression(true),
};

/**
 * Predefined expressions for document type operations
 */
export const documentTypeExpressions = {
	// Body expression for create/update operations
	body: `={{Object.fromEntries(Object.entries({
			name: $parameter.name,
			match: $parameter.match,
			matching_algorithm: $parameter.matchingAlgorithm,
			is_insensitive: $parameter.isInsensitive,
			owner: $parameter.owner,
			set_permissions: typeof $parameter.setPermissions === 'string' && $parameter.setPermissions.isNotEmpty() ? $parameter.setPermissions.parseJson() : undefined,
		}).filter(([_, v]) => v !== null && v !== undefined && v !== ""))}}`,

	// Query string parameters for get operations (document types have permissions and name filtering)
	query: createNameFilteredResourceExpression(true),
};

/**
 * Predefined expressions for storage path operations
 */
export const storagePathExpressions = {
	// Body expression for create/update operations
	body: `={{Object.fromEntries(Object.entries({
			name: $parameter.name,
			path: $parameter.path,
			match: $parameter.match,
			matching_algorithm: $parameter.matchingAlgorithm,
			is_insensitive: $parameter.isInsensitive,
			owner: $parameter.owner,
			set_permissions: typeof $parameter.setPermissions === 'string' && $parameter.setPermissions.isNotEmpty() ? $parameter.setPermissions.parseJson() : undefined,
		}).filter(([_, v]) => v !== null && v !== undefined && v !== ""))}}`,

	// Query string parameters for get operations (storage paths have permissions and name/path filtering)
	query: createResourceQueryExpression(
		{
			...commonParameterMappings.nameFiltering,
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
	body: `={{Object.fromEntries(Object.entries({
			name: $parameter.name,
			color: $parameter.color,
			match: $parameter.match,
			matching_algorithm: $parameter.matchingAlgorithm,
			is_insensitive: $parameter.isInsensitive,
			is_inbox_tag: $parameter.isInboxTag,
			owner: $parameter.owner,
			set_permissions: typeof $parameter.setPermissions === 'string' && $parameter.setPermissions.isNotEmpty() ? $parameter.setPermissions.parseJson() : undefined,
		}).filter(([_, v]) => v !== null && v !== undefined && v !== ""))}}`,

	// Query string parameters for get operations (tags have permissions and name filtering)
	query: createNameFilteredResourceExpression(true),
};

/**
 * Predefined expressions for custom field operations
 */
export const customFieldExpressions = {
	// Body expression for create/update operations with special handling for select fields
	body: `={{Object.fromEntries(Object.entries({
			name: $parameter.name,
			data_type: $parameter.dataType,
			extra_data: $parameter.dataType === 'select' && $parameter.selectOptions ? {select_options: $parameter.selectOptions.values || []} : $parameter.extraData,
			owner: $parameter.owner,
			set_permissions: typeof $parameter.setPermissions === 'string' && $parameter.setPermissions.isNotEmpty() ? $parameter.setPermissions.parseJson() : undefined,
		}).filter(([_, v]) => v !== null && v !== undefined && v !== ""))}}`,

	// Query string parameters for get operations (custom fields have name filtering but no permissions)
	query: createNameFilteredResourceExpression(false),
};

/**
 * Predefined expressions for document operations
 */
export const documentExpressions = {
	// Query string parameters for get operations
	query: createResourceQueryExpression(
		{
			title__icontains: 'titleContains',
			content__icontains: 'contentContains',
			tags__id__in: 'tagsIn',
			document_type__id: 'documentTypeId',
			correspondent__id: 'correspondentId',
			storage_path__id: 'storagePathId',
			archive_serial_number__icontains: 'asnContains',
			created__date__gte: 'createdAfter',
			created__date__lte: 'createdBefore',
			modified__date__gte: 'modifiedAfter',
			modified__date__lte: 'modifiedBefore',
		},
		true,
	),
};
