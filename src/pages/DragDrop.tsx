import React, { useState, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  Stack, 
  TextField,
  IconButton,
  Chip,
  Tooltip,
  Button,
  Snackbar,
  Alert,
  useTheme,
  alpha
} from '@mui/material';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Delete as DeleteIcon,
  Undo as UndoIcon,
  Redo as RedoIcon,
  Search as SearchIcon,
  Work as WorkIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import { commonStyles } from '../styles/animations';

const ItemTypes = {
  EMPLOYEE: 'employee',
  PROJECT_EMPLOYEE: 'project_employee',
};

interface Employee {
  id: string;
  name: string;
  designation: string;
  profilePic: string;
  projectId?: string;
  skills: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  employees: Employee[];
  maxEmployees: number;
  status: 'active' | 'completed' | 'on-hold';
}

interface HistoryState {
  employees: Employee[];
  projects: Project[];
}

const DraggableEmployeeCard: React.FC<{ 
  employee: Employee;
  source: 'pool' | 'project';
  projectId?: string;
  onRemoveEmployee?: (id: string) => void;
}> = ({ employee, source, projectId, onRemoveEmployee }) => {
  const theme = useTheme();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: source === 'pool' ? ItemTypes.EMPLOYEE : ItemTypes.PROJECT_EMPLOYEE,
    item: { id: employee.id, source, projectId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <Paper
      ref={drag}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: source === 'pool' ? 120 : 'auto',
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        backgroundColor: source === 'pool' 
          ? alpha(theme.palette.primary.main, 0.05)
          : alpha(theme.palette.secondary.main, 0.05),
        ...commonStyles.cardHover,
        ...commonStyles.fadeIn,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar
          src={employee.profilePic}
          sx={{ 
            width: source === 'pool' ? 50 : 30, 
            height: source === 'pool' ? 50 : 30,
            border: `2px solid ${theme.palette.primary.main}`,
            ...commonStyles.pulse
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Typography 
            variant={source === 'pool' ? 'h6' : 'body2'}
            sx={{ 
              fontWeight: 500,
              color: theme.palette.text.primary
            }}
          >
            {employee.name}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              color: theme.palette.text.secondary,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}
          >
            <WorkIcon sx={{ fontSize: 14 }} />
            {employee.designation}
          </Typography>
          {source === 'pool' && (
            <Box sx={{ mt: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {employee.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  sx={{ 
                    height: 20, 
                    fontSize: '0.75rem',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    }
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
        {source === 'project' && onRemoveEmployee && (
          <IconButton 
            size="small" 
            onClick={(e) => {
              e.stopPropagation();
              if (projectId) {
                onRemoveEmployee(employee.id);
              }
            }}
            sx={{ 
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: alpha(theme.palette.error.main, 0.1),
              }
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>
    </Paper>
  );
};

const ProjectCard: React.FC<{ 
  project: Project; 
  onDrop: (employeeId: string, source: 'pool' | 'project', sourceProjectId?: string) => void;
  onRemoveEmployee: (employeeId: string) => void;
}> = ({ project, onDrop, onRemoveEmployee }) => {
  const theme = useTheme();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: [ItemTypes.EMPLOYEE, ItemTypes.PROJECT_EMPLOYEE],
    drop: (item: { id: string; source: 'pool' | 'project'; projectId?: string }) => 
      onDrop(item.id, item.source, item.projectId),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'success';
      case 'completed': return 'info';
      case 'on-hold': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Paper
      ref={drop}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 200,
        backgroundColor: isOver 
          ? alpha(theme.palette.primary.main, 0.1)
          : alpha(theme.palette.background.paper, 0.8),
        border: isOver 
          ? `2px dashed ${theme.palette.primary.main}`
          : `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        ...commonStyles.cardHover,
        ...commonStyles.fadeIn,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 1 
      }}>
        <Typography 
          variant="h6"
          sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 600
          }}
        >
          {project.name}
        </Typography>
        <Chip 
          label={project.status} 
          color={getStatusColor(project.status)}
          size="small"
          sx={{ 
            fontWeight: 500,
            textTransform: 'capitalize'
          }}
        />
      </Box>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        gutterBottom
        sx={{ mb: 2 }}
      >
        {project.description}
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1,
        mb: 2,
        color: theme.palette.text.secondary
      }}>
        <GroupIcon fontSize="small" />
        <Typography variant="body2">
          Team Members: {project.employees.length}/{project.maxEmployees}
        </Typography>
      </Box>
      
      <Box sx={{ 
        mt: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        {project.employees.map((employee) => (
          <DraggableEmployeeCard
            key={employee.id}
            employee={employee}
            source="project"
            projectId={project.id}
            onRemoveEmployee={onRemoveEmployee}
          />
        ))}
      </Box>
    </Paper>
  );
};

const DragDrop: React.FC = () => {
  const theme = useTheme();
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      name: 'John Doe',
      designation: 'Senior Developer',
      profilePic: 'https://i.pravatar.cc/150?img=1',
      skills: ['React', 'TypeScript', 'Node.js'],
    },
    {
      id: '2',
      name: 'Jane Smith',
      designation: 'UI Designer',
      profilePic: 'https://i.pravatar.cc/150?img=2',
      skills: ['Figma', 'UI/UX', 'CSS'],
    },
    {
      id: '3',
      name: 'Mike Johnson',
      designation: 'QA Engineer',
      profilePic: 'https://i.pravatar.cc/150?img=3',
      skills: ['Testing', 'Automation', 'Jest'],
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      designation: 'Backend Developer',
      profilePic: 'https://i.pravatar.cc/150?img=4',
      skills: ['Python', 'Django', 'PostgreSQL'],
    },
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'p1',
      name: 'Project 1',
      description: 'E-commerce Platform',
      employees: [],
      maxEmployees: 3,
      status: 'active',
    },
    {
      id: 'p2',
      name: 'Project 2',
      description: 'Mobile App Development',
      employees: [],
      maxEmployees: 2,
      status: 'on-hold',
    },
    {
      id: 'p3',
      name: 'Project 3',
      description: 'Data Analytics Dashboard',
      employees: [],
      maxEmployees: 4,
      status: 'completed',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const saveToHistory = useCallback((newEmployees: Employee[], newProjects: Project[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ employees: newEmployees, projects: newProjects });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const state = history[newIndex];
      setEmployees(state.employees);
      setProjects(state.projects);
      setHistoryIndex(newIndex);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const state = history[newIndex];
      setEmployees(state.employees);
      setProjects(state.projects);
      setHistoryIndex(newIndex);
    }
  };

  const handleDrop = (projectId: string, employeeId: string, source: 'pool' | 'project', sourceProjectId?: string) => {
    const employeeToAssign = source === 'pool' 
      ? employees.find(emp => emp.id === employeeId)
      : projects
          .flatMap(p => p.employees)
          .find(e => e.id === employeeId);

    if (!employeeToAssign) return;

    const targetProject = projects.find(p => p.id === projectId);
    if (!targetProject) return;

    if (targetProject.employees.length >= targetProject.maxEmployees) {
      setNotification({ message: 'Project has reached maximum team size', type: 'error' });
      return;
    }

    // If moving from one project to another
    if (source === 'project' && sourceProjectId) {
      const sourceProject = projects.find(p => p.id === sourceProjectId);
      if (sourceProject) {
        sourceProject.employees = sourceProject.employees.filter(e => e.id !== employeeId);
      }
    }

    // Update projects
    const newProjects = projects.map(project => {
      if (project.id === projectId) {
        // Add employee to this project if not already present
        if (!project.employees.some(e => e.id === employeeId)) {
          return {
            ...project,
            employees: [...project.employees, employeeToAssign],
          };
        }
      }
      return project;
    });

    // Update employees list if coming from pool
    const newEmployees = source === 'pool'
      ? employees.filter(employee => employee.id !== employeeId)
      : employees;

    setProjects(newProjects);
    setEmployees(newEmployees);
    saveToHistory(newEmployees, newProjects);
    setNotification({ 
      message: source === 'pool' 
        ? 'Employee assigned successfully' 
        : 'Employee transferred successfully', 
      type: 'success' 
    });
  };

  const handleRemoveEmployee = (employeeId: string) => {
    const employee = projects
      .flatMap(p => p.employees)
      .find(e => e.id === employeeId);
    
    if (!employee) return;

    const newProjects = projects.map(project => ({
      ...project,
      employees: project.employees.filter(e => e.id !== employeeId),
    }));

    const newEmployees = [...employees, employee];
    
    setProjects(newProjects);
    setEmployees(newEmployees);
    saveToHistory(newEmployees, newProjects);
    setNotification({ message: 'Employee removed from project', type: 'success' });
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box sx={{ 
      flexGrow: 1,
      p: 3,
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4,
        ...commonStyles.fadeIn
      }}>
        <Typography 
          variant="h4"
          sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 600
          }}
        >
          Team Assignment
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Undo">
            <IconButton 
              onClick={handleUndo} 
              disabled={historyIndex <= 0}
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              <UndoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Redo">
            <IconButton 
              onClick={handleRedo} 
              disabled={historyIndex >= history.length - 1}
              sx={{ 
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2),
                }
              }}
            >
              <RedoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <DndProvider backend={HTML5Backend}>
        <Box sx={{ mb: 4, ...commonStyles.fadeIn }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: 3 
          }}>
            <Typography 
              variant="h6"
              sx={{ 
                color: theme.palette.primary.main,
                fontWeight: 500
              }}
            >
              Available Employees
            </Typography>
            <TextField
              size="small"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{ 
                width: 300,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.background.paper,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  }
                }
              }}
            />
          </Box>
          <Grid container spacing={2}>
            {filteredEmployees.map((employee) => (
              <Grid item xs={12} sm={6} md={4} key={employee.id}>
                <DraggableEmployeeCard 
                  employee={employee} 
                  source="pool"
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ ...commonStyles.fadeIn }}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              color: theme.palette.primary.main,
              fontWeight: 500,
              mb: 3
            }}
          >
            Projects
          </Typography>
          <Grid container spacing={2}>
            {projects.map((project) => (
              <Grid item xs={12} sm={6} md={4} key={project.id}>
                <ProjectCard 
                  project={project} 
                  onDrop={(employeeId, source, sourceProjectId) => 
                    handleDrop(project.id, employeeId, source, sourceProjectId)
                  }
                  onRemoveEmployee={handleRemoveEmployee}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </DndProvider>

      <Snackbar
        open={!!notification}
        autoHideDuration={3000}
        onClose={() => setNotification(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setNotification(null)} 
          severity={notification?.type} 
          sx={{ 
            width: '100%',
            ...commonStyles.fadeIn
          }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DragDrop; 