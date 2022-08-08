import {Link, useParams} from "react-router-dom";
import {getCompanyById} from "../../handlers/CompanyDataHandler";
import {CardHeader, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, Grid} from "@mui/material";
import {Card, Typography, Button, Paper,} from "@material-ui/core";

import Input from "@material-ui/core/Input";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";
import {useEffect, useState} from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import EventsCalendar from "../../../calendar/EventsCalendar";
import Box from "@mui/material/Box";
function CompanyInfo() {

    const [company, setCompany] = useState(null);
    const [rows, setRows] = useState(null)
    let {companyId} = useParams();
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        if (companyId != null) {
            getCompanyById(companyId).then(res => {
                setCompany(res.data)
            });
            console.log("Initializing")
            console.log(company)
        }
    }, [companyId])

    useEffect(() => {

        if (company != null && company.address != null) {
            company.streetName = company.address.streetName;
            company.streetNumber = company.address.streetNumber;
            company.localNumber = company.address.localNumber;
            company.city = company.address.city;
            company.zipCode = company.address.zipCode;
            company.postOffice = company.address.postOffice;

            setRows([
                createData("companyName"),
                createData("shareCapital"),
                createData("boardMembersTerm"),
                createData("boardOfDirectorsTerm"),
                createData("address"),
                createData("streetName"),
                createData("streetNumber"),
                createData("localNumber"),
                createData("city"),
                createData("zipCode"),
                createData("postOffice"),
                createData("shareValue"),
                createData("manySharesAllowed"),
            ]);
        }
    }, [company])


    const titleCardStyle = {
        marginLeft: "10%",
        marginRight: "10%",
        minWidth: "500px",
        marginTop: "30px",
        marginBottom: "80px"
    };

    const infoCardStyle = {
        minWidth: "460px",
        marginLeft: "3%",
        marginRight: "3%",
        marginBottom: "5%",

    };

    const memberCardStyle = {
        minWidth: "460px",
        height: "285px",
        minHeight: "285px",
        marginLeft: "3%",
        marginRight: "3%",
        textAlign: "center"
    };

    const calendar = {
        minWidth: "460px",
        minHeight: "285px",
        textAlign: "center"
    };

    const buttonStyle = {
        backgroundColor: "#5555ff",
        color: "white",
        width: '100%'
    };

    const gridStyle = {
        align: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto"
    }

    const tableStyle = {
        textAlign: "left",
    }

    const createData = (name, ...rest) => ({
        id: name,
        [name]: company[name],
        ...rest,
        isEditMode: false
    });

    const customTableCell = ({row, name, onChange}) => {
        // const classes = useStyles();
        const {isEditMode} = row;
        return (
            <TableCell align="left"
                // className={classes.tableCell}
            >
                {isEditMode ? (
                    <Input
                        value={row[name]}
                        name={name}
                        onChange={e => onChange(e, row)}
                        // className={classes.input}
                    />
                ) : (
                    row[name]
                )}
            </TableCell>
        );
    };

    const [previous, setPrevious] = useState({});
    const onDoneEditMode = id => {
        onToggleEditMode(id);
        setPrevious(state => ({...state, [id]: rows.find(row => row.id === id)}));
        if (id === "streetName" || id === "streetNumber" || id === "localNumber"
            || id === "city" || id === "zipCode" || id === "postOffice") {
            axiosPrivate.patch("/update-company-address",
                {
                    [id]: rows.find(row => row.id === id)[id],
                    "companyId": companyId
                })
                .then(() => {
                    console.log("Updated address")
                });
        } else if (id === "companyName") {
            axiosPrivate.get(`/companies/search/updateCompanyName?companyName=`
                + `${rows.find(row => row.id === id)[id]}&companyId=${companyId}`)
                .then(() => {
                    console.log("updated company name")
                }).catch(console.log);
        } else if (id === "shareCapital") {
            axiosPrivate.get(`/companies/search/updateShareCapital?shareCapital=`
                + `${rows.find(row => row.id === id)[id]}&companyId=${companyId}`)
                .then(() => {
                    console.log("updated share capital")
                }).catch(console.log);
        } else if (id === "boardOfDirectorsTerm") {
            axiosPrivate.get(`/companies/search/updateBoardOfDirectorsTerm?boardOfDirectorsTerm=`
                + `${rows.find(row => row.id === id)[id]}&companyId=${companyId}`)
                .then(() => {
                    console.log("updated board of directors term")
                }).catch(console.log);
        } else if (id === "boardMembersTerm") {
            axiosPrivate.get(`/companies/search/updateBoardMembersTerm?boardMembersTerm=`
                + `${rows.find(row => row.id === id)[id]}&companyId=${companyId}`)
                .then(() => {
                    console.log("updated board members term")
                }).catch(console.log);
        } else if (id === "shareValue") {
            axiosPrivate.get(`/companies/search/updateShareValue?shareValue=`
                + `${rows.find(row => row.id === id)[id]}&companyId=${companyId}`)
                .then(() => {
                    console.log("updated share value")
                }).catch(console.log);
        }
        company[id] = rows.find(row => row.id === id)[id];
    }
    const onToggleEditMode = id => {
        setRows(rows => {
            return rows.map(row => {
                if (row.id === id) {
                    return {...row, isEditMode: !row.isEditMode};
                }
                return row;
            });
        });
    };

    const onChange = (e, row) => {
        // console.log("onChange")
        if (!previous[row.id]) {
            setPrevious(state => ({...state, [row.id]: row}));
        }
        const value = e.target.value;
        const name = e.target.name;
        const {id} = row;
        const newRows = rows.map(row => {
            if (row.id === id) {
                return {...row, [name]: value};
            }
            return row;
        });
        setRows(newRows);
    };

    const onRevert = id => {
        const newRows = rows.map(row => {
            if (row.id === id) {
                return previous[id] ? previous[id] : row;
            }
            return row;
        });
        setRows(newRows);
        setPrevious(state => {
            delete state[id];
            return state;
        });
        onToggleEditMode(id);
    };

    const generateIcons = (row) => (
        row.isEditMode ? (
            <>
                <IconButton
                    aria-label="done"
                    onClick={() => onDoneEditMode(row.id)}
                >
                    <DoneIcon/>
                </IconButton>
                <IconButton
                    aria-label="revert"
                    onClick={() => onRevert(row.id)}
                >
                    <RevertIcon/>
                </IconButton>
            </>
        ) : (
            <IconButton
                aria-label="edit"
                onClick={() => onToggleEditMode(row.id)}
            >
                <EditIcon/>
            </IconButton>
        ));

    return (
        company != null && rows != null &&
        <>
        <Card style={titleCardStyle}>
            <Typography variant="h4" align="center">
                {company['companyName']}<br/>
            </Typography>
        </Card>
            <TableContainer component={Paper} style={tableStyle}>
                <Table>
                        <TableBody>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <Grid sx={{
                                marginTop: "2%",
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 3,
                                gridTemplateRows: 'auto',
                                gridTemplateAreas: `"header address"
                                                    "info members"
                                                    "calendar ."`,
                            }}>
                                <Card style={infoCardStyle} sx={{gridArea: 'header'}}>
                                    <CardHeader
                                        title="Informacje o Spółce"
                                        titleTypographyProps={{align: 'center'}}
                                    />
                                    <TableRow>
                                        <TableCell>
                                            Nazwa spółki:
                                        </TableCell>
                                        {customTableCell({
                                            row: rows.find(row => row.id === "companyName"),
                                            name: "companyName", onChange
                                        })}
                                        {generateIcons(rows.find(row => row.id === "companyName"))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Numer KRS:
                                        </TableCell>
                                        <TableCell>
                                            {company["krsNumber"]}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            NIP:
                                        </TableCell>
                                        <TableCell>
                                            {company["nip"]}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            REGON:
                                        </TableCell>
                                        <TableCell>
                                            {company["regon"]}
                                        </TableCell>
                                    </TableRow>
                                </Card>

                                <Card style={infoCardStyle} sx={{gridArea: 'address'}}><TableRow>
                                    <TableCell>
                                        Ulica:
                                    </TableCell>
                                    {customTableCell({
                                        row: rows.find(row => row.id === "streetName"),
                                        name: "streetName", onChange
                                    })}
                                    {generateIcons(rows.find(row => row.id === "streetName"))}
                                </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Numer budynku:
                                        </TableCell>
                                        {customTableCell({
                                            row: rows.find(row => row.id === "streetNumber"),
                                            name: "streetNumber", onChange
                                        })}
                                        {generateIcons(rows.find(row => row.id === "streetNumber"))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Numer lokalu:
                                        </TableCell>
                                        {customTableCell({
                                            row: rows.find(row => row.id === "localNumber"),
                                            name: "localNumber", onChange
                                        })}
                                        {generateIcons(rows.find(row => row.id === "localNumber"))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Miejscowość:
                                        </TableCell>
                                        {customTableCell({
                                            row: rows.find(row => row.id === "city"),
                                            name: "city", onChange
                                        })}
                                        {generateIcons(rows.find(row => row.id === "city"))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Kod pocztowy:
                                        </TableCell>

                                        {customTableCell({
                                            row: rows.find(row => row.id === "zipCode"),
                                            name: "zipCode", onChange
                                        })}
                                        {generateIcons(rows.find(row => row.id === "zipCode"))}
                                    </TableRow>

                                    <TableRow>
                                        <TableCell>
                                            Poczta:
                                        </TableCell>

                                        {customTableCell({
                                            row: rows.find(row => row.id === "postOffice"),
                                            name: "postOffice", onChange
                                        })}
                                        {generateIcons(rows.find(row => row.id === "postOffice"))}
                                    </TableRow>
                                </Card>
                {/*<Box>*/}
                {/*    <Card style={memberCardStyle}>*/}
                {/*        <Link to={"invite"}><Button style={buttonStyle}>Zaproś do Spółki</Button></Link>*/}
                {/*        <Typography>*/}
                {/*            Osoby zarejestrowane w spółce:*/}

                {/*            <ul style={tableStyle}>*/}
                {/*                <li>*/}
                {/*                    do wypełnienia*/}
                {/*                </li>*/}
                {/*            </ul>*/}
                {/*        </Typography>*/}
                {/*    </Card><br/>*/}

                {/*    <Box style={memberCardStyle}>*/}
                {/*        <EventsCalendar />*/}
                {/*    </Box>*/}
                {/*</Box>*/}

                                <Card style={infoCardStyle} sx={{gridArea: 'info'}}>
                                    <TableRow>
                                        <TableCell>
                                            Kapitał zakładowy (PLN):
                                        </TableCell>

                                        {customTableCell({
                                            row: rows.find(row => row.id === "shareCapital"),
                                            name: "shareCapital",
                                            onChange
                                        })}
                                        {generateIcons(rows.find(row => row.id === "shareCapital"))}
                                    </TableRow>
                                    {rows.find(row => row.id === "manySharesAllowed")["manySharesAllowed"] === true ?
                                        <TableRow>
                                            <TableCell>
                                                Wartość udziału (PLN):
                                            </TableCell>
                                            {customTableCell({
                                                row: rows.find(row => row.id === "shareValue"),
                                                name: "shareValue", onChange
                                            })}
                                            {generateIcons(rows.find(row => row.id === "shareValue"))}
                                        </TableRow>
                                        : null
                                    }
                                    <TableRow>
                                        <TableCell>
                                            Kadencja rady nadzorczej (w latach):
                                        </TableCell>

                                        {customTableCell({
                                            row: rows.find(row => row.id === "boardOfDirectorsTerm"),
                                            name: "boardOfDirectorsTerm", onChange
                                        })}
                                        {generateIcons(rows.find(row => row.id === "boardOfDirectorsTerm"))}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Kadencja zarządu (w latach):
                                        </TableCell>

                                        {customTableCell({
                                            row: rows.find(row => row.id === "boardMembersTerm"),
                                            name: "boardMembersTerm", onChange
                                        })}
                                        {generateIcons(rows.find(row => row.id === "boardMembersTerm"))}
                                    </TableRow>
                                </Card>
                                <Card style={memberCardStyle} sx={{gridArea: 'members'}}>
                                    <Link to={"invite"}><Button style={buttonStyle}>Zaproś do Spółki</Button></Link>
                                    <Typography>
                                        Osoby zarejestrowane w spółce:

                                        <ul style={tableStyle}>
                                            <li>
                                                do wypełnienia
                                            </li>
                                        </ul>
                                    </Typography>
                                </Card>
                                <Box style={calendar} sx={{gridArea: 'calendar'}}>
                                    <EventsCalendar />
                                </Box>
                            </Grid>
                        {/*</Box>*/}
                        </div>
                </TableBody>
            </Table>
    </TableContainer>
    {/*</Box>*/}
    {/*</div>*/}
</>)
}

export default CompanyInfo;
