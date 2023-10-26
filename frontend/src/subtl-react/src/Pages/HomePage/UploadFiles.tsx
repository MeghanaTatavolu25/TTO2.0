import { Box, Button, FormControl, InputLabel, MenuItem, Select, Tab, Tabs, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DropFiles from '../../Components/DropFiles.tsx';
import { AddWebsite, AddYoutubeVideo, getGroupsList, UploadDocument, UploadVideo } from '../../utils/APIUtils.ts';

const InputSpan = {
    width: '100%',
    position: 'relative' as 'relative',
    marginBottom: '8px'
}

export function UploadFiles(props: {
    groups: {
        company_id: string
        documents: number,
        id: string,
        name: string,
        pages: number
    }[]
}) {
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

    const [files, setFiles] = useState<File[]>([])

    const[youtubeURL, setYoutubeURL] = useState('')
    const[websiteURL, setWebsiteURL] = useState('')
    const[youtubetitle, setyoutubetitle] = useState<string|null>(null)
    const[websitetitle, setwebsitetitle] = useState<string|null>(null)

    function updateFiles(files: File[]) {
        setFiles(files)
    }

    useEffect(() => {
        console.log(files)
    }, [files])

    const [tab, setTab] = useState(0)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small">Group</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={selectedGroup}
                    label="Instance"
                    onChange={(e) => {
                        setSelectedGroup(e.target.value)
                    }}
                >
                    {props.groups.length > 0 && props.groups.map((item) => (
                        <MenuItem value={item.id}>
                            <em>{item.name}</em>
                        </MenuItem>
                    ))}

                </Select>
            </FormControl>
            <TabPanel value={tab} index={2}>
                <div>
                    <span style={InputSpan}>
                        <TextField value={youtubeURL} style={{ width: '100%' }} onChange={(e) => {
                            setYoutubeURL(e.target.value)
                        }}
                            label="Youtube Video URL" variant="filled" />
                            <TextField value={youtubetitle} style={{ width: '100%' }} onChange={(e) => {
                            setyoutubetitle(e.target.value)
                        }}
                            label="Custom Title" variant="filled" />
                    </span>
                    <Button 
                    onClick={()=>{
                            AddYoutubeVideo(youtubeURL, sessionStorage.getItem('access_token') as string, selectedGroup as string, youtubetitle as string).then((res) => {
                                console.log(res);
                                alert('Success: The video has been added!')
                                setYoutubeURL('')
                                setyoutubetitle('');
                            })
                            .catch(()=>{
                                alert('There has been a problem adding, please try again')
                            })
                    }}
                    disabled={shouldDisableButton(isValidYouTubeUrl(youtubeURL), youtubetitle!==null, selectedGroup!==null)}
                    variant={'contained'}
                        style={{
                            backgroundColor: isValidYouTubeUrl(youtubeURL)&&selectedGroup&&youtubetitle!==null ? '#000' : '#e9e9e9',
                            width: '100%'
                        }}>Add Video</Button>
                </div>
                <div style={{marginTop:'20px'}}>
                    <span style={InputSpan}>
                        <TextField value={websiteURL} style={{ width: '100%' }} onChange={(e) => {
                            setWebsiteURL(e.target.value)
                        }}
                            label="Website URL" variant="filled" />
                            <TextField value={websitetitle} style={{ width: '100%' }} onChange={(e) => {
                            setwebsitetitle(e.target.value)
                        }}
                            label="Custom Title" variant="filled" />
                    </span>
                    <Button 
                    onClick={()=>{
                        AddWebsite(websiteURL, sessionStorage.getItem('access_token') as string, selectedGroup as string, websitetitle as string).then((res)=>{
                            setWebsiteURL('')
                            setwebsitetitle('')
                            alert('Success: The Webpage has been added!')
                        })
                        .catch(()=>{
                            alert('There has been a problem adding, please try again')
                        })
                    }}
                    disabled={shouldDisableButton(isValidWebUrl(websiteURL), websitetitle!==null, selectedGroup!==null)}
                    variant={'contained'}
                        style={{
                            backgroundColor: isValidWebUrl(websiteURL)&&selectedGroup&&websitetitle ? '#000' : '#e9e9e9',
                            width: '100%'
                        }}>Add Webpage</Button>
                </div>
            </TabPanel>


            <TabPanel value={tab} index={1}>
                <>
                    {/* Video */}
                    <div style={{ background: 'aliceblue', height: '240px' }}>
                        <DropFiles text={'Please include only one trascript (vtt) and video (mp4) file'} files={files} returnFiles={updateFiles} />
                    </div>
                    <Button
                        disabled={files.length === 2 && selectedGroup 
                            && (files[0].name.includes('mp4')||files[1].name.includes('mp4')) 
                            && (files[0].name.includes('vtt')||files[1].name.includes('vtt')) 
                            ? false : true}
                        onClick={(e) => {
                            e.stopPropagation()
                            if (selectedGroup && files.length > 0) {
                                let access_token = sessionStorage.getItem('access_token') as string;
                                let vttfile = files[0];
                                let videofile = files[1];
                                console.log(vttfile.type)
                                console.log(videofile.type.includes('video'))

                                // UploadVideo(files[0], files[1],selectedGroup,String(Date.now()),  access_token).then((res) => {
                                //     if (res === 'success') {
                                //         alert('File(s) uploaded successfully!!');
                                //         setFiles([]);
                                //         setSelectedGroup(null)
                                //     }
                                // })
                            }
                        }}
                        variant={'contained'}
                        style={{
                            backgroundColor: files.length === 2 && selectedGroup 
                            && (files[0].name.includes('mp4')||files[1].name.includes('mp4')) 
                            && (files[0].name.includes('vtt')||files[1].name.includes('vtt')) ? '#000' : '#e9e9e9',
                            width: '100%'
                        }}>
                        Upload Video
                    </Button>
                </>
            </TabPanel>


            <TabPanel value={tab} index={0}>
                <>
                    <div style={{ background: 'aliceblue', height: '240px' }}>
                        <DropFiles text={"Drag 'n' drop some files here, or click to select files"} files={files} returnFiles={updateFiles} />
                    </div>
                    <Button
                        disabled={files.length > 0 && selectedGroup ? false : true}
                        onClick={(e) => {
                            e.stopPropagation()
                            if (selectedGroup && files.length > 0) {
                                let access_token = sessionStorage.getItem('access_token') as string;
                                UploadDocument(access_token, files[0], selectedGroup, String(Date.now())).then((res) => {
                                    if (res === 'success') {
                                        alert('File(s) uploaded successfully!!');
                                        setFiles([]);
                                        setSelectedGroup(null)
                                    }
                                })
                            }
                        }}
                        variant={'contained'}
                        style={{
                            backgroundColor: files.length > 0 && selectedGroup !== null ? '#000' : '#e9e9e9',
                            width: '100%'
                        }}>
                        Upload
                    </Button>
                </>
            </TabPanel>
            <Tabs variant="scrollable" value={tab} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="PDFs" />
                <Tab label="Videos" />
                <Tab wrapped label="Youtube or Website" />
            </Tabs>

        </>
    )
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

function isValidYouTubeUrl(str:string) {
    // YouTube video URL regex pattern
    var pattern = /^https?:\/\/(?:www\.)?youtube\.com\/watch\?(?=.*v=\w+)(?:\S+)?$/;

    // Test the input string against the pattern
    return pattern.test(str);
}
function isValidWebUrl(str:string) {
    // Regular expression pattern for website or webpage URL
    var pattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?$/;
  
    // Test the input string against the pattern
    return pattern.test(str);
  }

  function shouldDisableButton(one:boolean, two:boolean, three:boolean){
    if(one===true&&two===true&&three===true){
        return false
    }else{
        return true
    }
  }
  