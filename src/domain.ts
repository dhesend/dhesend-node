import Dhesend from "./index";
import { CreateDomainPath, DeleteDomainPath, ListDomainPath } from "./path";

type CreateDomainResponse = {
    id: string;
    /** Domain name */
    name: string;
    /** Informational message, e.g., "Add these records to your DNS settings." */
    message: string;
    txt: {
        name: string;
        value: string;
    };
    dkim: {
        name: string;
        /** Type of record (e.g., CNAME) */
        type: string;
        value: string;
    }[];
};

type ListDomainResponse = {
    domain: string;
    status: "failed" | "verified" | "verifying";
    createdAt: Date;
    updatedAt: Date;
};

type DeleteDomainResponse = {
    success: string;
};

class Domain {
    private readonly dhesend: Dhesend;

    constructor(dhesend: Dhesend) {
        this.dhesend = dhesend;
    };

    async create(domainName: string) {
        if (!domainName.includes(".")) {
            throw new Error("Provide a valid domain, e.g., `dhesend.com`.");
        };

        return this.dhesend.post<CreateDomainResponse>(
            CreateDomainPath,
            JSON.stringify({ domain: domainName })
        );
    };

    async list() {
        return this.dhesend.get<ListDomainResponse[]>(ListDomainPath);
    };

    async delete(domainName: string) {
        return this.dhesend.post<DeleteDomainResponse>(
            DeleteDomainPath,
            JSON.stringify({ domain: domainName })
        );
    };
};

export default Domain;