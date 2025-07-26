import { IAuthenticateGeneric, ICredentialType, INodeProperties } from 'n8n-workflow';

export class PaperlessNgxApi implements ICredentialType {
	name = 'paperlessNgxApi';
	displayName = 'Paperless API';
	documentationUrl = 'https://docs.paperless-ngx.com/api/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'token',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Instance URL',
			name: 'instanceUrl',
			type: 'string',
			default: 'https://paperless.example.com',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Token {{$credentials.token}}',
			},
		},
	};
}
