export interface NoticeData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    start_time: string
    end_time: string
    everyone: boolean
    fault: boolean
    important: boolean
    info: boolean
    title: string,
    data: string,
    group_id: number,
    noc_id: number,
    user_id: number
}

export interface NoticeRegisterData {
    user_id: number[],
    group_id: number[],
    noc_id: number[],
    start_time: string,
    end_time?: string,
    title: string,
    data: string,
    everyone: boolean,
    important: boolean,
    fault: boolean
    info: boolean
}

export interface UserDetailData {
    CreatedAt: string,
    ID: number,
    UpdatedAt: string,
    email: string,
    expired_status: number,
    group?: GroupDetailData
    group_id: number,
    level: number,
    mail_token: string,
    mail_verify: true,
    name: string,
    name_en: string,
    notice?: NoticeData[],
    pass: string,
    tokens?: TokenDetailData[]
}

export interface PaymentDetailData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    user?: UserDetailData,
    group?: GroupDetailData,
    is_membership: boolean,
    paid: boolean,
    refund: boolean,
    fee: number,
    payment_intent_id: string,
    comment: string,
}

export interface TokenDetailData {
    CreatedAt: string,
    ID: number,
    UpdatedAt: string,
    access_token: string,
    admin: boolean,
    debug: string,
    expired_at: string,
    status: number,
    tmp_token: string,
    user?: UserDetailData,
    user_id: number,
    user_token: string,
}

export interface TicketDetailData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    solved: boolean,
    group_id: number,
    admin: boolean,
    title: string,
    request: boolean,
    request_reject: boolean,
    chat?: ChatData[],
    user?: UserDetailData,
    group?: GroupDetailData,
}

export interface NodeDetailData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    zone_id: number,
    group_id: number,
    admin_only: boolean,
    name: string,
    ip: string,
    port: number,
    user: string,
    pass: string,
    ws_port: number,
    manage_net: string,
    mac: string,
    machine: string,
    emulator: string,
    comment: string,
    enable: boolean
}

export interface VMCreateData {
    vm?: VMCreateDetailData,
    node_id: number,
    group_id: number,
    template_apply: boolean,
    template?: VMCreateTemplateData
}

export interface VMCreateDetailData {

}

export interface VMCreateTemplateData {
    name: string,
    password: string,
    node_id: number, //コレはいらん
    storage_id: number,
    template_plan_id: number,
    storage_capacity: number,
    storage_path_type: number,
    ip: string,
    netmask: string,
    gateway: string,
    dns: string,
    pci: string[],
    usb: string[],
    nic_type: string,
}

export interface VMListData {
    id: number,
    name: string,
    uuid: string,
    type: string,
    status: number,
    vcpu: number,
    vcpu_current: number,
    memory: number,
    bootdev: string[],
    type_arch: string,
    type_machine: string,
}

export interface VMDiskData {

}

export interface VMGraphicData {

}

export interface VMInterfaceData {

}

export interface VMData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
}

export interface TemplateData {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    name: string
    tag: string
    image_id: string
    template_plan?: TemplatePlanData[]
}

export interface TemplatePlanData {
    ID: number
    CreatedAt: string
    UpdatedAt: string
    template_id: number
    cpu: number
    mem: number
    storage: number
    hide: boolean
}

export interface GroupDetailData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    payment_coupon_template_id?: number,
    payment_membership_template_id?: number,
    expired_status: number,
    status: number,
    pass: boolean,
    add_allow: boolean,
    agree: boolean,
    question: string,
    org: string,
    org_en: string,
    postcode: string,
    address: string,
    address_en: string,
    tel: string,
    country: string,
    contract: string,
    student: boolean,
    student_expired: string,
    fee: number,
    lock: boolean,
    paid: boolean,
    member_expired: string,
    users?: UserDetailData[],
    tickets?: TicketDetailData[],
    payment_coupon_template?: PaymentCouponTemplateData
    payment_membership_template?: PaymentMembershipTemplate
}

export interface PaymentMembershipTemplate {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    title: string,
    plan: string,
    monthly: boolean,
    yearly: boolean,
    fee: number,
    comment: string
}

export interface PaymentCouponTemplateData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    title: string,
    discount_rate: number,
    comment: string
}

export interface TemplateBaseData {
    template: TemplateData[]
    novnc_url: string
    storage?: StorageData[]
    payment_membership_template?: PaymentMembershipTemplate[]
    payment_coupon_template?: PaymentCouponTemplateData[]
    user?: UserDetailData[]
    group?: GroupDetailData[]
}

export interface NodeData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    name: string,
    ip: string,
    port: number,
    user: string,
    pass: string,
    ws_port: number,
    manage_net: string,
    mac: string,
    machine: string,
    emulator: string,
    comment: string,
    enable: boolean,
    storage?: StorageData[]
    nic?: NICData[]
}

export interface StorageData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    node_id: number,
    admin_only: boolean,
    name: string,
    type: number,
    path: string,
    max_capacity: number,
    comment: string
}

export interface NICData {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    node_id: number,
    group_id: number,
    admin_only: boolean,
    name: string,
    enable: boolean,
    virtual: boolean,
    type: number,
    vlan: number,
    speed: number,
    mac: string,
    comment: string,
}

export interface ChatData {
    time: string,
    data: string,
    user_name: string,
    admin: boolean,
}

export const DefaultVMCreateData: VMCreateData = {
    vm: undefined,
    node_id: 0,
    group_id: 0,
    template_apply: false,
    template: undefined
}

export const DefaultVMCreateTemplateData: VMCreateTemplateData = {
    name: "",
    password: "",
    node_id: 0,
    storage_id: 0,
    template_plan_id: 0,
    storage_capacity: 0,
    storage_path_type: 0,
    ip: "",
    netmask: "",
    gateway: "",
    dns: "",
    pci: [""],
    usb: [""],
    nic_type: "",
}