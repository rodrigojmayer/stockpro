import * as React from 'react';
import { 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper,  
  Switch,
  Tooltip
} from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import { useState, useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import { Data, DataTable, ColumnDataCategories } from '../../types';
import { UserContext } from '../../context/UserContext'
import { ColumnsContext } from '../../context/ColumnsContext'
import { useStylesGlobal } from '../../Styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import LockIcon from '@mui/icons-material/Lock';
import CustomFields from '../CustomFields';
import { LanguageLabelsContext } from '../../context/LanguageLabelsContext';
import { CategoriesContext } from '../../context/CategoriesContext';
import { CategoriesSubContext } from '../../context/CategoriesSubContext';


// type TableClasses = ReturnType<typeof useStyles>;

const INITIAL_STATE = {
  _id: "",
  id: NaN,
  id_client: NaN,
  product: "",
  amount: NaN,
  measure: "",
  category: "",
  sub_category: "",
}

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function rowContent(
    _index: number, 
    row: Data, 
    columnsTable: ColumnDataCategories[], 
    classes: any, 
    openUpdateAmountStock:(newData: Data) => void,  
    user_background_color:any,
  ) {

  let newRow = { ...row } // Create a copy of the item to add in the same level the custom_fields

  const RowContent = (item:any) => {
    return( 
      <Tooltip 
        title={newRow[item.column.dataKey]} 
        disableHoverListener={String(newRow[item.column.dataKey]).length <= 10}
        slotProps={{
            popper: {
            sx: {
                [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
                {
                    marginTop: '0px',
                    marginLeft: '5px',
                },
            }
            }
        }}
      >
        <Typography noWrap 
            sx={{
                padding: "1.4px 4px",
            }}
        >
          { newRow[item.column.dataKey] }
        </Typography>
      </Tooltip>
    )
  }
  return (
    <React.Fragment >
      {columnsTable.map((column) => (
        <TableCell
          key={column.id}
          align='center'
          onClick={() => openUpdateAmountStock({
              "_id":newRow._id, 
              "id": newRow.id, 
              "id_client": newRow.id_client, 
              "product": newRow.product, 
              "amount": newRow.amount, 
              "measure": newRow.measure, 
              "category": newRow.category, 
              "sub_category": newRow.sub_category,
              "id_sub_category": newRow.id_sub_category, 
              "code": newRow.code, 
              "price": newRow.price, 
              "description": newRow.description, 
              "url_image": newRow.url_image, 
              "alert_amount": newRow.alert_amount, 
              "alert_amount_enabled": newRow.alert_amount_enabled, 
              "alerted_amount": newRow.alerted_amount, 
              "alert_date": newRow.alert_date, 
              "alert_date_enabled": newRow.alert_date_enabled, 
              "alerted_date": newRow.alerted_date, 
              "newRow": newRow})}
          className={`${ _index%2 ? classes[`_${user_background_color}table_row_odd` as keyof typeof classes]  : classes[`_${user_background_color}table_row_even` as keyof typeof classes] }`}
          style={{ 
             border:0,
          }}
          sx={{
            padding: "0",
          }}
        >
          {RowContent({column: column})}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function TableCategories(
  { 
    data, 
    openUpdateAmountStock
  }:  DataTable ) {

  const  {classes} = useStylesGlobal()
  const breakpointLG = useMediaQuery('(min-width:1024px)');
  const breakpointMD = useMediaQuery('(min-width: 724px)');
  const { labelsTableProducts } = useContext<any>(LanguageLabelsContext)

  const { user } = useContext<any>(UserContext);
  const { categories } = useContext<any>(CategoriesContext) 
  const { categoriesSub } = useContext<any>(CategoriesSubContext) 
  const { columnsUserOrder } = useContext<any>(ColumnsContext);

  const elementToAdd = {dataKey: "check_stock", id: 0, width: 40,}
  const columnsTable = [elementToAdd, ...columnsUserOrder];
  const columns = [
    {
        _id: "2",
        id: 2,
        dataKey: "category",
        label: "Category",
        width: 120
    },
    {
        _id: "4",
        id: 4,
        dataKey: "sub_category",
        label: "Sub category",
        width: 120
    }
  ]

  const filteredFields = categoriesSub.map((categorySub: any) => {
    if(categorySub.name !== "-"){    
        let categoryFind = categories.find((category:any) => category.id === categorySub.id_category)
        return ({
            _id: categorySub._id,
            id_category: categoryFind.id,
            category: categoryFind.name,
            id_sub_category: categorySub.id,
            sub_category: categorySub.name
        }) 
    }
  }).filter(Boolean)

  const [filteredData, setFilteredData] = useState<any>(filteredFields)
  const initialManageColumns = columns.map((column:any) => {
    const foundColumn = columnsUserOrder.find((columnUserOrder:any) => columnUserOrder._id === column._id)
    const isInArray = foundColumn !== undefined ? true : false;
    return {_id:column._id, id:column.id, width:column.width, label: column.label, dataKey:column.dataKey, showInTable: isInArray}
  })
  initialManageColumns.sort((a:any, b:any) => {
    if (a.label.toLowerCase() < b.label.toLowerCase()) return -1;
    if (a.label.toLowerCase() > b.label.toLowerCase()) return 1;
    return 0;
  })

  const [manageColumns, setManageColumns] = useState(initialManageColumns)
  const [filteredRows, setFilteredRows] = useState<Data>(INITIAL_STATE);
  const [sortedData, setSortedData] = useState(data)
  const [openCustomFieldsModal, setOpenCustomFieldsModal] = useState(false); 
  const handleCloseCustomFieldsModal = () => {
    setOpenCustomFieldsModal(false)
  }
  
  const handleOpenCustomFieldsModal = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(null);
    setOpenCustomFieldsModal(true)
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const openTableOptions = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // Delay resetting anchorEl until after the menu has closed
    setAnchorEl(null);
  };
  
  const openSubTableOptions = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setAnchorEl2(event.currentTarget);
  }
  
  const handleClose2 = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  const handlePickColumn = (columnSelected: any) => {
    if(columnSelected.id === -1) return
    const indexColumnUserOrder = columnsUserOrder.findIndex((columnUserOrder:any) => columnUserOrder._id === columnSelected._id);
    const actualColumnUserOrder = columnsUserOrder
    const indexManageColumn = manageColumns.findIndex((manageColumn:any) => manageColumn._id === columnSelected._id);
    const actualManageColumn = manageColumns
    if (indexColumnUserOrder !== -1) {
      actualColumnUserOrder.splice(indexColumnUserOrder, 1);
      actualManageColumn[indexManageColumn].showInTable = false
    } else {
      actualColumnUserOrder.push(columnSelected)
      actualManageColumn[indexManageColumn].showInTable = true
    }

    const array_ordered_fields = actualColumnUserOrder.map((col:any)=>col.id)
    
    const fetchEditUsersFieldsOrder = async () => {
        let loadingSuccess: boolean = false
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL_BACKEND}/users/${user._id}/`, {
              method: 'PATCH',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  ordered_fields: array_ordered_fields
              })
            })
            if (response) {
                loadingSuccess = true
            } else {
                console.error('Update failed.')
            }
        } catch (error: unknown) {
        }
    }
    fetchEditUsersFieldsOrder()

    setManageColumns(actualManageColumn)
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilteredRows({ ...filteredRows, [event.target.id]: (event.target.value) })
  };

  return (
    
    <div>
      <CustomFields 
          open={openCustomFieldsModal} 
          handleClose={handleCloseCustomFieldsModal}  
      /> 
      <Paper style={{backgroundColor: "rgb(0, 0, 0, 0)", height: `calc(100dvh - ${(breakpointLG?"105px":"150px")})`, width: (breakpointLG?"98vw":"94vw"), margin: "12px auto 0 auto" ,borderRadius: "10px"}}>
        <TableVirtuoso 
          data={sortedData}
          components={VirtuosoTableComponents}
          style={{
            backgroundColor: "rgb(0, 0, 0, 0)", 
            borderRadius: "10px", 
            scrollbarWidth: "none", boxShadow: `-5px 5px 20px 2px black `,
            cursor: "pointer"
          }}
          fixedHeaderContent={() => {
              return (
                <TableRow>
                  {columns.map((columnTable:any, index: number) => (
                    <TableCell
                      key={columnTable.id}
                      variant="head" 
                      align='center'
                      className={`${classes[`_${user.background_color}main_background_colorD` as keyof typeof classes]} ${classes[`_${user.background_color}table_header_color` as keyof typeof classes]} ${index === columnsTable.length - 1 ? classes.gradient_effect : "" }`}
                      
                      style={{ 
                        width: columnTable.width, 
                        border:0
                      }}
                      sx={{
                        padding: "8px 0",
                      }}
                    >
                      <Typography noWrap
                        sx={{
                          padding: "0 4px ",
                        }}
                      >
                        { columnTable.label ? 
                              columnTable.label 
                            : 
                            <>
                              <IconButton
                                onClick={
                                  openTableOptions
                                }
                                className={classes[`_${user.background_color}table_header_color` as keyof typeof classes]}
                                style={{ 
                                  width: "30px", 
                                  border:0
                                }}
                                sx={{
                                  padding: "0",
                                  top: "-5px",
                                }}
                              >
                                <MoreVertIcon fontSize="small" />
                              </IconButton>  
                              <Menu
                                disableScrollLock={true}
                                id="demo-positioned-menu"
                                aria-labelledby="demo-positioned-button"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose} 
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                                }}
                                style={{ 
                                  marginTop: '20px', 
                                  marginLeft: '15px',
                                }}

                                MenuListProps={{
                                    sx: { padding: 0,  
                                    },
                                }}
                              >
                                <MenuItem 
                                  className={`${classes.menu_item} ${classes[`_${user.background_color}menu_item_background_color` as keyof typeof classes]}`} 
                                >
                                  <Typography 
                                    align="center" 
                                    variant="body2" 
                                  > 
                                    <Switch 
                                      size='small'
                                      color='success'  
                                    />  
                                    {labelsTableProducts.alerts_on_top}
                                  </Typography>
                                </MenuItem>
                                <MenuItem 
                                  onClick={ openSubTableOptions }
                                  className={`${classes.menu_item} ${classes[`_${user.background_color}menu_item_background_color` as keyof typeof classes]}`} 
                                >
                                  <Typography 
                                    align="center" 
                                    variant="body2" 
                                  > 
                                    {labelsTableProducts.manage_columns}
                                  </Typography>
                                </MenuItem>
                                {(user.id_access_level < 4) &&
                                  <MenuItem 
                                    onClick={ handleOpenCustomFieldsModal  }
                                    className={`${classes.menu_item} ${classes[`_${user.background_color}menu_item_background_color` as keyof typeof classes]}`} 
                                  >
                                    <Typography 
                                      align="center" 
                                      variant="body2" 
                                    > 
                                      {labelsTableProducts.custom_fields}
                                    </Typography>
                                  </MenuItem> 
                                }
                              </Menu>
                              <Menu
                                className={breakpointMD ? `${classes.table_menu} ${classes[`_${user.background_color}table_menu_background_color` as keyof typeof classes]}` : ""}
                                id="demo-positioned-menu2"
                                aria-labelledby="demo-positioned-button2"
                                anchorEl={anchorEl2}
                                open={open2}
                                onClose={handleClose2}
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                                }}
                                style={{ 
                                  marginTop: '-57px', 
                                  marginLeft: '0px',
                                  height: '370px',
                                }}
                                MenuListProps={{
                                    sx: { padding: 0,
                                    },
                                }}
                              >
                                {manageColumns.map((manageColumn:any) => (
                                  <MenuItem 
                                    key={manageColumn.id}
                                    onClick={() => handlePickColumn(manageColumn) }
                                    className={`${classes.menu_item} ${classes[`_${user.background_color}menu_item_background_color` as keyof typeof classes]}`} 
                                  >
                                    <Typography 
                                      align="center" 
                                      variant="body2" 
                                    > 
                                      <Switch 
                                        size='small'
                                        color='success'  
                                        checked={manageColumn.showInTable}
                                      />  
                                        {manageColumn.label}
                                        {manageColumn.id==-1 ? 
                                          <LockIcon 
                                            style={{
                                              paddingTop: "10px",
                                            }}
                                            fontSize='small'
                                          /> 
                                        : 
                                          "" }
                                    </Typography>
                                  </MenuItem> 
                                ))}
                              </Menu>
                            </>
                          }
                          </Typography>
                            <TextField
                              id={columnTable.dataKey.toString()}
                              onChange={handleFilterChange}
                              maxRows={1}
                              size="small"
                              sx={{
                                backgroundColor: "white",
                                borderRadius: 1,
                                margin: "8px",
                              }}
                              InputProps={{
                                style: {
                                  height:"36px",
                                },
                              }}
                            />
                    </TableCell>
                  ))}
                </TableRow>
              );
            }}
          itemContent={(index: number) =>
            rowContent(
                index, 
                filteredData[index], 
                columns, 
                classes, 
                openUpdateAmountStock, 
                user.background_color
            )
          }
        />
      </Paper>
    </div>
  );
}