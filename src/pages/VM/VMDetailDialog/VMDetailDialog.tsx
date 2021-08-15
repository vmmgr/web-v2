import React, {useEffect} from 'react';
import {useSnackbar} from "notistack";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid, InputLabel, LinearProgress, MenuItem,
    Radio,
    RadioGroup, Select, TextField
} from "@material-ui/core";
import useStyles from "../style";
import {
    DefaultVMCreateData, DefaultVMCreateTemplateData, StorageData,
    TemplateBaseData, TemplatePlanData,
} from "../../../interface";
import {StorageType} from "../../../components/Dashboard/Type/StorageType";
import {SendMessage} from "react-use-websocket";


export function VMDetailDialog(props: {
    templateBase: TemplateBaseData | undefined
    sendMessage: SendMessage
    message: string
}) {
    const {templateBase, sendMessage, message} = props;
    const classes = useStyles();
    const [data, setData] = React.useState(DefaultVMCreateData);
    const [open, setOpen] = React.useState(false);
    const [tmpPlan, setTmpPlan] = React.useState<TemplatePlanData[]>();
    const [nodeID, setNodeID] = React.useState(0);
    const [tmpStorage, setTmpStorage] = React.useState<StorageData[]>();
    const [createTemplate, setCreateTemplate] = React.useState(DefaultVMCreateTemplateData);
    // const [name, setName] = React.useState("");
    const {enqueueSnackbar} = useSnackbar();

    const request = () => {
        console.log(templateBase);
        console.log(createTemplate);

        sendMessage(JSON.stringify({
            access_token: sessionStorage.getItem('ACCESS_TOKEN'),
            type: 10,
            create: {
                node_id: nodeID,
                template_apply: true,
                template: createTemplate
            }
            // message: inputChatData
        }));
    }

    const templateApplyValue = () => {
        if (!data.template_apply) {
            return 1;
        } else {
            return 2;
        }
    }

    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                VMの作成
            </Button>
            <Dialog onClose={() => setOpen(false)} fullScreen={true} aria-labelledby="customized-dialog-title"
                    open={open}
                    PaperProps={{
                        style: {
                            backgroundColor: "#2b2a2a",
                        },
                    }}>
                <DialogTitle id="customized-dialog-title">
                    VMの作成
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <h3>VM作成ユーザ</h3>
                            <RadioGroup row aria-label="create_type" name="create_type" defaultValue="top"
                                        onChange={(event) => {
                                            setData({...data, group_id: Number(event.target.value)})
                                        }}>
                                <FormControlLabel checked={data.group_id === 0} value={0}
                                                  control={<Radio color="primary"/>} label="管理者サイド"/>
                                <FormControlLabel checked={data.group_id !== 0} value={1}
                                                  control={<Radio color="primary"/>} label="グループサイド"/>
                            </RadioGroup>
                            <br/>
                            {
                                data.group_id !== 0 &&
                                <FormControl className={classes.formSelect}>
                                    <InputLabel>Group指定</InputLabel>
                                    <Select
                                        labelId="group_id"
                                        id="group_id"
                                        onChange={(event) => {
                                            setData({...data, group_id: Number(event.target.value)})
                                        }}
                                    >
                                        {
                                            templateBase?.group?.map((row, index) => (
                                                <MenuItem key={index} value={row.ID}>{row.ID}: {row.org}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            }
                            <h3>Template</h3>
                            <RadioGroup row aria-label="template_apply" name="template_apply" value={templateApplyValue}
                                        onChange={(event) => {
                                            if (Number(event.target.value) === 1) {
                                                setData({...data, template_apply: false})
                                            } else {
                                                setData({...data, template_apply: true})
                                            }
                                        }}>
                                <FormControlLabel checked={!data.template_apply} value={1}
                                                  control={<Radio color="primary"/>} label="手動"/>
                                <FormControlLabel checked={data.template_apply} value={2}
                                                  control={<Radio color="primary"/>} label="Template適用"/>
                            </RadioGroup>
                            {/*<br/>*/}
                            {/*<FormControl className={classes.formSelect}>*/}
                            {/*    <InputLabel>Node指定</InputLabel>*/}
                            {/*    <Select*/}
                            {/*        labelId="select_node"*/}
                            {/*        id="select_node"*/}
                            {/*        onChange={(event) => {*/}
                            {/*            setNodeID(Number(event.target.value))*/}
                            {/*            const tmp = templateBase?.node?.filter(item => item.ID === 1)*/}
                            {/*            if (tmp !== undefined) {*/}
                            {/*                console.log(tmp[0])*/}
                            {/*                setTmpStorage(tmp[0].storage)*/}
                            {/*            }*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        {*/}
                            {/*            templateBase?.node?.map((row, index) => (*/}
                            {/*                <MenuItem key={"template_node_" + index}*/}
                            {/*                          value={row.ID}>{row.ID}: {row.name}({row.ip}:{row.port})</MenuItem>*/}
                            {/*            ))*/}
                            {/*        }*/}
                            {/*    </Select>*/}
                            {/*</FormControl>*/}
                            <br/>
                            {
                                data.template_apply &&
                                <div>
                                    <FormControl className={classes.formSelect}>
                                        <InputLabel>Storage指定</InputLabel>
                                        <Select
                                            labelId="template_storage"
                                            id="template_storage"
                                            onChange={(event) => {
                                                setCreateTemplate({
                                                    ...createTemplate,
                                                    storage_id: Number(event.target.value)
                                                })
                                            }}
                                        >
                                            {
                                                templateBase?.storage?.map((rowStorage, indexPlan) => (
                                                    <MenuItem key={"template_plan" + indexPlan}
                                                              value={rowStorage.ID}>
                                                        {rowStorage.ID}: {rowStorage.name}({StorageType(rowStorage.type)}_{rowStorage.path})
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <br/>
                                    <FormControl className={classes.formSelect}>
                                        <InputLabel>Template Image指定</InputLabel>
                                        <Select
                                            labelId="template_image"
                                            id="template_image"
                                            onChange={(event) => {
                                                console.log(Number(event.target.value))
                                                const tmp = templateBase?.template?.filter(item => item.ID === 1)
                                                if (tmp !== undefined) {
                                                    console.log(tmp[0])
                                                    setTmpPlan(tmp[0].template_plan)
                                                }
                                            }}
                                        >
                                            {
                                                templateBase?.template?.map((row, index) => (
                                                    <MenuItem key={"template_image_" + index}
                                                              value={row.ID}>{row.ID}: {row.name}({row.tag})</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formSelect}>
                                        <InputLabel>Plan指定</InputLabel>
                                        <Select
                                            labelId="template_plan"
                                            id="template_plan"
                                            onChange={(event) => {
                                                setCreateTemplate({
                                                    ...createTemplate,
                                                    template_plan_id: Number(event.target.value)
                                                })
                                            }}
                                        >
                                            {
                                                tmpPlan?.map((rowPlan, indexPlan) => (
                                                    <MenuItem key={"template_plan" + indexPlan}
                                                              value={rowPlan.ID}>
                                                        {rowPlan.ID}: (CPU: {rowPlan.cpu}Core Mem: {rowPlan.mem}MB
                                                        Storage: {rowPlan.storage}MB)
                                                    </MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                    <br/>
                                    <TextField
                                        className={classes.formMedium}
                                        id="name_template"
                                        label="name"
                                        multiline
                                        rows={1}
                                        value={createTemplate.name}
                                        onChange={event => setCreateTemplate({
                                            ...createTemplate,
                                            name: event.target.value
                                        })}
                                        variant="outlined"
                                    />
                                    <br/>
                                    <TextField
                                        className={classes.formMedium}
                                        id="pass_template"
                                        label="pass"
                                        multiline
                                        rows={1}
                                        value={createTemplate.password}
                                        onChange={event => setCreateTemplate({
                                            ...createTemplate,
                                            password: event.target.value
                                        })}
                                        type={"password"}
                                        variant="outlined"
                                    />
                                    <br/>
                                    <TextField
                                        className={classes.formVeryShort}
                                        id="ip_template"
                                        label="IP Address"
                                        multiline
                                        rows={1}
                                        value={createTemplate.ip}
                                        onChange={event => setCreateTemplate({
                                            ...createTemplate,
                                            ip: event.target.value
                                        })}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.formVeryShort}
                                        id="netmask_template"
                                        label="Netmask"
                                        multiline
                                        rows={1}
                                        value={createTemplate.netmask}
                                        onChange={event => setCreateTemplate({
                                            ...createTemplate,
                                            netmask: event.target.value
                                        })}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.formShort}
                                        id="gateway_template"
                                        label="Gateway"
                                        multiline
                                        rows={1}
                                        value={createTemplate.gateway}
                                        onChange={event => setCreateTemplate({
                                            ...createTemplate,
                                            gateway: event.target.value
                                        })}
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.formMedium}
                                        id="dns_template"
                                        label="DNS"
                                        multiline
                                        rows={1}
                                        value={createTemplate.dns}
                                        onChange={event => setCreateTemplate({
                                            ...createTemplate,
                                            dns: event.target.value
                                        })}
                                        variant="outlined"
                                    />
                                    <br/>
                                    <TextField
                                        className={classes.formMedium}
                                        id="nic_type"
                                        label="NIC_Type"
                                        multiline
                                        rows={1}
                                        value={createTemplate.nic_type}
                                        onChange={event => setCreateTemplate({
                                            ...createTemplate,
                                            nic_type: event.target.value
                                        })}
                                        variant="outlined"
                                    />
                                    <br/>
                                </div>
                            }
                            <br/>
                            {/*<TextField*/}
                            {/*    className={classes.formVeryLong}*/}
                            {/*    id="data"*/}
                            {/*    label="内容"*/}
                            {/*    multiline*/}
                            {/*    rows={6}*/}
                            {/*    value={data.data}*/}
                            {/*    onChange={event => setData({...data, data: event.target.value})}*/}
                            {/*    variant="outlined"*/}
                            {/*/>*/}
                        </Grid>
                        <Grid item xs={12}>
                            状況: {message}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setOpen(false)} color="secondary">
                        Close
                    </Button>
                    <Button autoFocus onClick={request} color="primary">
                        登録
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}