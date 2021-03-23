import React from 'react';
import { Table } from '../../common/components/table';
import { Header } from './header';
import { Row } from './row';

export const MeetingTable = (props) => (

    <Table
      title="Title"
      items={props.meetList}
      headerRender={Header}
      rowRender={Row}
    />

);