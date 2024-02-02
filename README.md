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
                        Contains the default columns and the filtered custom columns
                    defaultColumns (not used)
                    customColumns
                        Contains all the custom columns saved in the database (also the deleted ones)
                    setCustomColumns
                    columnsUserOrder 
                        Contains the order of the columns for the user logged
                    setColumnsUserOrder (not used)
                    filteredColumnsCustom setFilteredColumnsCustom
                        Contains the custom columns saved in the database except the deleted ones
                CheckListStockContext:
                    checkListStock (not used)
                    setCheckListStock
            States:
                orderedFields <ColumnData[]> setOrderedFields

                unsetFields <ColumnData[]> setUnsetFields

                customFields <ColumnDataCustom[]> setCustomFields
                    Saves the temporary array of all the custom fields before to save.
                customFieldsNew <ColumnDataCustom[]> setCustomFieldsNew
                    Saves the temporary array of custom fields added before to save.
                addButtonShow <boolean>

                isFetching (not used)

                openSaveChanges <boolean>

    
        Functions:
            removeField (event)


            addField (event)


            handleDragEnd (result)


            handleEditCustomFieldNew (event)
                For each event key that we press updates the customFieldsNew label.
                Checks that is not repeated with the previous collumns.


            preSaveCustomField (_id, id, label)


            deleteField (_id, id)


            addInputCustomField ()
                Takes the id from the last custom field to use the next id in the new custom field
                setCustomFieldsNew(updateFieldsNew)
            handleCloseSaveChanges (ans: Boolean)


            handleOpenSaveChanges ()




        useEffect [open]


        useEffect [customFieldsNew]

        
        Use cases:
            Create custom field:
                1. Press the plus button:
                    Runs function addInputCustomField
                    The plus button will become hidden
                    Shows the input custom field and the delete button
                2. Write the name of the custom field
                    Runs function handleEditCustomFieldNew 
                3. Press the small ok button
                    Runs function preSaveCustomField
                4. Press the big ok button

            Edit custom field:

            Delete custom field:

