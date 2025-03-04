import * as uriTemplates from "uri-templates";

export class URI {
    public uriTemplates;

    constructor(public uri: string, public templated: boolean = false, public fetchedURI = "") {
        if (templated) {
            this.uriTemplates = uriTemplates(uri);
        }
    }

    public get resourceURI(): string {
        if (this.templated) {
            if (this.fetchedURI != "") {
                return this.fetchedURI
            }
            throw new Error("can not call delete on resource with templated link")
        } else {
            return this.uri
        }
    }

    public fill(params: object = {}): string {
        return this.templated && this.uriTemplates ? this.uriTemplates.fill(params) : this.uri;
    }
}
