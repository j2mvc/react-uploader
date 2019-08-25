import React from 'react'
export default ({
    width = 32,height=32,className = "icon",color="gray"
})=>(<svg className={className} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14721" width={width} height={height}><path fill={color} d="M704 96V320h192l-192-224zM704 0l256 320v640c0 38.4-25.6 64-64 64H128c-38.4 0-64-25.6-64-64V64c0-38.4 25.6-64 64-64h576zM640 320V64H128v896h768V384c0-12.8-83.2-12.8-256 0V320zM256 320h256v64H256V320z m576 192v64H256V512h576z m-576 192h576v64H256v-64z" p-id="14722"></path></svg>)
