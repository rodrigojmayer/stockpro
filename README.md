Stock-Pro

Brainstorm
Changes record
States record
Selection of different color styles






Documentation:
    - Components:
        Fields:
            Props:
                open
                handleClose
            Contexts:
                IsLoadingContext:
                    isLoading (not used)
                    setIsLoading
                    openBackdrop (not used)
                    setOpenBackdrop (not used)
                UserContext:
                    user
                    setUser (not used)
                ColumnsContext:
                    columns
                    defaultColumns (not used)
                    customColumns
                    setCustomColumns
                    columnsUserOrder
                    setColumnsUserOrder (not used)
                    filteredColumnsCustom
                CheckListStockContext:
                    checkListStock (not used)
                    setCheckListStock
            States:
                orderedFields <ColumnData[]> setOrderedFields
                unsetFields <ColumnData[]>
                setUnsetFields
                customFields <ColumnDataCustom[]>
                setCustomFields
                customFieldsNew <ColumnDataCustom[]>
                setCustomFieldsNew
                addButtonShow <boolean>
                isFetching (not used)
                openSaveChanges <boolean>
    
        Functions:
            removeField (event)


            addField (event)


            handleDragEnd (result)


            handleEditCustomFieldNew (event)


            saveCustomField (_id, id, label)


            deleteField (_id, id)


            addInputCustomField ()


            handleCloseSaveChanges (ans: Boolean)


            handleOpenSaveChanges ()




        useEffect [open]


        useEffect [customFieldsNew]

        
        Use cases:
            Create custom field:
                1. Press the plus button:
                    Run- function addInputCustomField
                    The plus button will become hidden

                2. Write the name of the custom field
                3. Press the small ok button
                4. Press the big ok button

            Edit custom field:

            Delete custom field:

