// src/components/wrappers/TableHeadWrapper.tsx
import TableHead from '@mui/material/TableHead';
import React from 'react';

const CustomTableHead = (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <TableHead {...props} />
);

export default CustomTableHead;