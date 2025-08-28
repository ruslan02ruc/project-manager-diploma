// import { useEffect } from 'react';
// import { useQueryClient } from '@tanstack/react-query';

// export const useTaskEvents = () => {
//   const queryClient = useQueryClient();

//   useEffect(() => {
//     const eventSource = new EventSource('http://localhost:4200/api/tasks/sse');

//     eventSource.onmessage = (event) => {
//       const task = JSON.parse(event.data);
//       queryClient.invalidateQueries({
//         queryKey: ['tasks', task.projectId]
//       });
//     };

//     return () => {
//       eventSource.close();
//     };
//   }, []);
// };
