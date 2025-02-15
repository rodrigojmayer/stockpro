// src/components/wrappers/TableHeadWrapper.tsx
import TableHead from '@mui/material/TableHead';
import React from 'react';

const CustomTableHead = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>> (
  (props, ref) => <TableHead ref={ref} {...props} />
);

export default CustomTableHead;