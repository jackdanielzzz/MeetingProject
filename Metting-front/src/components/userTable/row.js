import React from "react";
import { Link } from "react-router-dom";

export const Row = (meet) => (
  <tr key={meet.id}>
    <td>
      <span>{meet.dateOnly}</span>
    </td>
    <td>
      <Link to={'edit/' + meet.subject}>{meet.subject}</Link>
    </td>
    <td>
      <span>{meet.meetSubdivision.sub_name}</span>
    </td>
    <td>
      <span>{meet.responsible.shortResponsible}</span>
    </td>
    <td>
      <span>{meet.consists.length}</span>
    </td>
  
  </tr>
);