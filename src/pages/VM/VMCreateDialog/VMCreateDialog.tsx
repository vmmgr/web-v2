import React, {Dispatch, SetStateAction} from 'react';
import {useSnackbar} from "notistack";
import {
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid, InputLabel, LinearProgress, MenuItem, Select, TextField
} from "@material-ui/core";
import useStyles from "../style";
import {
    DefaultVMCreateTemplateData,
    TemplateBaseData, TemplatePlanData,
} from "../../../interface";
import {StorageType} from "../../../components/Dashboard/Type/StorageType";
import {SendMessage} from "react-use-websocket";

export function VMCreateDialog(props: {
    templateBase: TemplateBaseData | undefined
    sendMessage: SendMessage
    progress: number,
    message: string,
    setReload: Dispatch<SetStateAction<boolean>>
}) {
    const {templateBase, sendMessage, progress, message, setReload} = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [tmpPlan, setTmpPlan] = React.useState<TemplatePlanData[]>();
    const [createTemplate, setCreateTemplate] = React.useState(DefaultVMCreateTemplateData);
    const {enqueueSnackbar} = useSnackbar();

    const request = () => {
        console.log(templateBase);
        console.log(createTemplate);
        enqueueSnackbar("データ送信", {variant: "info"});

        sendMessage(JSON.stringify({
            access_token: sessionStorage.getItem('ACCESS_TOKEN'),
            type: 10,
            create: {
                template_apply: true,
                template: createTemplate
            }
        }));

        setReload(true);
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
                            <h3>Template</h3>
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
                        </Grid>
                        <Grid item xs={12}>
                            <LinearProgress variant="determinate" value={progress}/>
                            <br/>
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