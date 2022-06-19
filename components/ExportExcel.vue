<template>
    <button @click="ExportExcelFile">
        <slot></slot>
    </button>
</template>

<script>
    import XLSX from 'xlsx/xlsx';
    window.$ = window.jQuery = require('jquery');
    export default {
        name: "ExportExcel",
        props: {
            columns: {
                type: Array,
                default: []
            },
            sheetData: {
                type: Array,
                default: []
            },
            filename: {
                type: String,
                default: 'excel'
            },
            sheetname: {
                type: String,
                default: 'SheetName'
            }
        },
        methods: {
            ExportExcelFile() {
                let createXLSLFormatObj = [];
                let newXlsHeader = [];
                let vm = this;
                if (vm.columns.length === 0){
                    console.log("Add columns!");
                    return;
                }
                if (vm.sheetData.length === 0){
                    console.log("Add sheetData!");
                    return [];
                }
                $.each(vm.columns, function(index, value) {
                    newXlsHeader.push(value.label);
                });
                createXLSLFormatObj.push(newXlsHeader);
                $.each(vm.sheetData, function(index, value) {
                    let innerRowsheetData = [];
                    $.each(vm.columns, function(index, val) {
                        if (val.sheetDataFormat && typeof val.sheetDataFormat === 'function') {
                            innerRowsheetData.push(val.sheetDataFormat(value[val.field]));
                        }else {
                            innerRowsheetData.push(value[val.field]);
                        }
                    });
                    createXLSLFormatObj.push(innerRowsheetData);
                });
                let filename = vm.filename + ".xlsx";
                let ws_name = vm.sheetname;
                let wb = XLSX.utils.book_new(),
                    ws = XLSX.utils.aoa_to_sheet(createXLSLFormatObj);
                XLSX.utils.book_append_sheet(wb, ws, ws_name);
                XLSX.writeFile(wb, filename);
            }
        }
    }
</script>