import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class PaperlessNgxUpload implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Paperless NGX Upload',
		name: 'paperlessNgxUpload',
		icon: 'file:paperlessngx.svg',
		group: ['transform'],
		version: 1,
		subtitle: 'Upload Document',
		description: 'Upload documents to Paperless NGX',
		defaults: {
			name: 'Paperless NGX Upload',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'paperlessNgxApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Input Data Field Name',
				name: 'inputDataFieldName',
				type: 'string',
				placeholder: 'e.g. data',
				default: 'data',
				required: true,
				hint: 'The name of the input field containing the binary file data to upload to Paperless',
				description:
					'Find the name of input field containing the binary data to upload the file in the Input panel on the left, in the Binary tab',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				placeholder: 'e.g. My Document',
				description: 'Specify a title that the consumer should use for the document (optional)',
			},
			{
				displayName: 'Correspondent ID',
				name: 'correspondent',
				type: 'number',
				default: undefined,
				description: 'Specify the ID of a correspondent that the consumer should use for the document (optional)',
			},
			{
				displayName: 'Document Type ID',
				name: 'documentType',
				type: 'number',
				default: undefined,
				description: 'Specify the ID of a document type that the consumer should use for the document (optional)',
			},
			{
				displayName: 'Storage Path ID',
				name: 'storagePath',
				type: 'number',
				default: undefined,
				description: 'Specify the ID of a storage path that the consumer should use for the document (optional)',
			},
			{
				displayName: 'Archive Serial Number',
				name: 'archiveSerialNumber',
				type: 'string',
				default: '',
				description: 'An optional archive serial number to set',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const inputDataFieldName = this.getNodeParameter('inputDataFieldName', i) as string;

				// Get the binary data
				const binaryData = this.helpers.assertBinaryData(i, inputDataFieldName);
				const fileBuffer = await this.helpers.getBinaryDataBuffer(i, inputDataFieldName);

				// Get parameters
				const title = this.getNodeParameter('title', i) as string;
				const correspondent = this.getNodeParameter('correspondent', i, 0) as number;
				const documentType = this.getNodeParameter('documentType', i, 0) as number;
				const storagePath = this.getNodeParameter('storagePath', i, 0) as number;
				const archiveSerialNumber = this.getNodeParameter('archiveSerialNumber', i) as string;

				// Prepare form data - only include supported fields according to Paperless NGX API docs
				const formData: IDataObject = {};

				// Only add fields if they have values (all are optional)
				if (title) {
					formData.title = title;
				}

				if (correspondent !== 0) {
					formData.correspondent = correspondent;
				}

				if (documentType !== 0) {
					formData.document_type = documentType;
				}

				if (storagePath !== 0) {
					formData.storage_path = storagePath;
				}

				if (archiveSerialNumber !== "") {
					formData.archive_serial_number = archiveSerialNumber;
				}

				// Make the API request using n8n's built-in support for form data
				const credentials = await this.getCredentials('paperlessNgxApi');
				const baseUrl = (credentials.instanceUrl as string).replace(/\/$/, '');

				const response = await this.helpers.requestWithAuthentication.call(this, 'paperlessNgxApi', {
					method: 'POST',
					uri: `${baseUrl}/api/documents/post_document/`,
					formData: {
						...formData,
						document: {
							value: fileBuffer,
							options: {
								filename: binaryData.fileName,
								contentType: binaryData.mimeType,
							},
						},
					},
					// Don't parse as JSON since the response is a plain text UUID
				});

				// The response is a plain text UUID, so we need to structure it properly
				const documentId = typeof response === 'string' ? response.trim() : response;

				returnData.push({
					json: {
						documentId,
						message: 'Document uploaded successfully',
						filename: binaryData.fileName,
						title: title || binaryData.fileName,
					},
					pairedItem: {
						item: i,
					},
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
