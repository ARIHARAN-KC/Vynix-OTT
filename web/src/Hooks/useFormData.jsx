import { useContext } from 'react';
import { FormDataContext } from '../context/FormdatacontextProvider.jsx';

const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) throw new Error('useFormData must be used inside FormDataProvider');
  return context;
};

export default useFormData;
