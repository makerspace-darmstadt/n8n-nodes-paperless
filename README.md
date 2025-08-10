# n8n-nodes-paperless

This is an n8n community node. It lets you use Paperless-ngx in your n8n workflows.

Paperless-ngx is an open-source document management system. This node lets you automate and sync core metadata entities (correspondents, tags, custom fields, document types, storage paths) around your documents. (Document CRUD/upload operations will be added later.)

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)

## Installation

Follow the n8n guide for installing community nodes: https://docs.n8n.io/integrations/community-nodes/installation/

Install this package in your n8n instance (e.g. via UI) using its npm name once published.

## Operations

Current resources (document operations intentionally excluded for now):

* Correspondent: Create, Get (list + filters), Get by ID, Update (PUT), Partial Update (PATCH), Delete
* Tag: Create, Get (list + filters), Get by ID, Update (PUT), Partial Update (PATCH), Delete
* Custom Field: Create (with select options), Get (list + filters), Get by ID, Update (PUT), Partial Update (PATCH), Delete
* Document Type: Create, Get (list + filters), Get by ID, Update (PUT), Partial Update (PATCH), Delete
* Storage Path: Create, Get (list + filters), Get by ID, Update (PUT), Partial Update (PATCH), Delete

Filtering & pagination support (where applicable): page, page size, ordering/sort, name-based filters, ID inclusion filters, and permission expansion (full permissions) for supported resources.

## Credentials

You need a Paperless-ngx API token and your instance base URL.

1. In Paperless-ngx, create an API token (User Settings → API Tokens).
2. Add new credentials in n8n selecting "Paperless API" and supply:
  * API Token
  * Instance URL (e.g. https://paperless.example.com)

All requests authenticate using an HTTP header: `Authorization: Token <token>`.

## Compatibility

Tested with:
* n8n: >= 1.50 (NodeJS 20 runtime)
* Paperless-ngx API: 2.7+ (endpoints for the listed resources)

Should work with any recent Paperless-ngx version that exposes the same REST endpoints; open an issue if you find a mismatch.

## Resources

* n8n community nodes docs: https://docs.n8n.io/integrations/#community-nodes
* Paperless-ngx API reference: https://docs.paperless-ngx.com/api/
* Paperless-ngx project: https://github.com/paperless-ngx/paperless-ngx

---

Planned: add document upload/retrieval operations and richer search helpers in a future version.
