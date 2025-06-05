import { BlogSimpleDTO } from "@/services/partnership.service";

export enum BlogPartnersSituation {
    ACEITO,
    PENDENTE,
    RECUSADO
}

export interface BlogPartnership {
    id?: number,
    senderBlog?: BlogSimpleDTO,
    receiverBlog?: BlogSimpleDTO,
    situation?: BlogPartnersSituation,
    requestDate?: string,
    updateDate?: string,
}