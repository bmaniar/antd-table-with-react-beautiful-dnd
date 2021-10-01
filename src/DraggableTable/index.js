import React, { useEffect, useState, Fragment } from 'react'
import { Table, Row, Col, Card, Empty } from "antd";
import 'antd/dist/antd.css'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const mockData = [
	{ id: 'panel-1', header: 'THis is panel 1', text: 'DUMMY ASS' },
	{ id: 'panel-2', header: 'THis is panel 2', text: 'DUMMY ASS 2' },
	{ id: 'panel-3', header: 'THis is panel 3', text: 'DUMMY ASS 3' },
	{ id: 'panel-4', header: 'THis is panel 4', text: 'DUMMY ASS 4' },
	{ id: 'panel-5', header: 'THis is panel 5', text: 'DUMMY ASS 5' },
	{ id: 'panel-6', header: 'THis is panel 6', text: 'DUMMY ASS 6' },
	{ id: 'panel-7', header: 'THis is panel 7', text: 'DUMMY ASS 7' }
]

const tableColumns = [
	{
		title: "ID",
		dataIndex: "id"
	},
	{
		title: "Header",
		dataIndex: "header"
	},
	{
		title: "Text",
		dataIndex: "text"
	}
]

const DraggableTable = () => {
	const [tableData, setTableData] = useState(mockData)

	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result
		if (!destination) {
			return
		}
		if (destination.index === source.index) {
			return
		}

		const newTableData = Array.from(tableData)
		newTableData.splice(source.index, 1) // removing the item
		newTableData.splice(destination.index, 0, tableData.find(data => data.id === draggableId)) // pushing in the new position
		setTableData(newTableData)
	}

	const customTableWrapper = (props) => (
		<Droppable
			droppableId="droppable"
		>
			{(provided) => (
				<Fragment>
					<tbody
						ref={provided.innerRef}
						{...props}
						{...provided.droppableProps}
					>
					</tbody>
					<tfoot>
						{provided.placeholder}
					</tfoot>
				</Fragment>
			)}
		</Droppable>
	)

	const customTableRow = ({ index, record, ...restProps }) => {
		return (
			<Draggable
				key={record.id}
				draggableId={record.id}
				index={index}
			>
				{(provided) => (
					<tr
						key={record.id}
						ref={provided.innerRef}
						{...restProps}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className='row-item'
					/>
				)}
			</Draggable>
		)
	}

	const components = {
		body: {
			// Custom tbody
			wrapper: customTableWrapper,
			// Custom row
			row: customTableRow
		},
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Table
				dataSource={tableData}
				columns={tableColumns}
				components={components}
				onRow={(record, index) => ({
					index,
					record
				})}
				pagination={false}
			/>
		</DragDropContext>
	)
}

export default DraggableTable
