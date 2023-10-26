export type chatFunctions = {
    updateMessages:(messages:Answer[])=>void;
    updateQuestion:(question:string)=>void;
}

export type Answer = {
    answer:string;
    id:string;
    transaction_id:string;
    phrase:string;
    group_id:string;
    page_no:number;
    document_id:string;
    metadata:[string, number, number];
    document_type:string;
    document_name:string;
}

export type GroupItem ={
    id: string,
    name: string,
    upload_date: string,
    document_url: string,
    document_type: string,
    company_id: string,
    upload_status: "Done"|"Processing",
    pages: number,
    creation_date: string,
    user_name:string,
    file_size:string
}