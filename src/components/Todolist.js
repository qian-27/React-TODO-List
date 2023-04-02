import React , { useState, useRef} from 'react'
import TodoTable from './TodoTable';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
   children?: React.ReactNode;
   index: number;
   value: number;

}

function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;
 
   return (
     <div
       role="tabpanel"
       hidden={value !== index}
       id={`simple-tabpanel-${index}`}
       aria-labelledby={`simple-tab-${index}`}
       {...other}
     >
       {value === index && (
         <Box sx={{ p: 6 }}>
           <Typography>{children}</Typography>
         </Box>
       )}
     </div>
   );
 }

function a11yProps(index: number) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}

export default function Todolist() {
   const [todo, setTodo] = useState({ description: '', date: '', priority: ''});
   const [todos, setTodos] = useState([])
   const gridRef = useRef()

   const [value, setValue] = React.useState(0);

   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   const yourChangeDateFunc = (date) => {
      if (date) {
         const dateString = date.format('YYYY-MM-DD');
         setTodo({ ...todo, date: dateString });
      } else {
         setTodo({ ...todo, date: '' });
      }
   };
   
   const handleAddTodo = () => {
      setTodos([todo, ...todos]);
      setTodo({ description: '', date: '', priority: ''});
   }

   const deleteTodo = (event) => {
      event.preventDefault()
      if(gridRef.current.getSelectedNodes().length > 0) {
         setTodos(todos.filter((todo, index) => 
            index != gridRef.current.getSelectedNodes()[0].id))
      }
      else {
         alert('Please select a row first')
      }   
   }

   return(
      <React.Fragment>
         <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
               <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
               >
                  <Tab label="HOME" {...a11yProps(0)} />
                  <Tab label="TODOS" {...a11yProps(1)} />
               </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
               This is the Home page, you can click the TODOS tab to add things to your to-do List.
            </TabPanel>

            <TabPanel value={value} index={1}>
               <Stack 
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={3}
               >
                  <TextField 
                     label="Description"
                     variant="standard"
                     value={todo.description}
                     onChange={e => setTodo({...todo, description: e.target.value})} 
                  />

                  <TextField 
                     label="Priority"
                     variant="standard"
                     value={todo.priority}
                     onChange={e => setTodo({...todo, priority: e.target.value})} 
                  />

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                     <DemoContainer components={['DatePicker']}>
                        <DatePicker
                           label="date"
                           defaultValue={dayjs('2022-04-01')}
                           value={todo.date ? dayjs(todo.date) : null}
                           onChange={(newValue) => yourChangeDateFunc(newValue)}
                           renderInput={(params) => <TextField {...params} />}
                        />
                     </DemoContainer>
                  </LocalizationProvider>

                  <Button 
                     variant="contained" 
                     onClick={handleAddTodo}>
                     Add
                  </Button>
                  <Button 
                     variant="contained" 
                     color="error" 
                     onClick={deleteTodo}>
                     Delete
                  </Button>
               </Stack>
               <TodoTable todos={todos} deleteTodo={deleteTodo} gridRef={gridRef}/>

            </TabPanel>
         </Box>
        
      </React.Fragment>
   )
}

