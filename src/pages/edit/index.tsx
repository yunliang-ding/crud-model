import DesignerForm from '@/designer/form';
import DesignerTable from '@/designer/table';
import { useSearchParams } from 'react-router-dom';

export default ({ type, id }: any) => {
  const [searchParams] = useSearchParams();
  const _type = searchParams.get('type') || type;
  const _id = searchParams.get('id') || id;
  return _type === 'form' ? (
    <DesignerForm schemaId={_id} />
  ) : (
    <DesignerTable schemaId={_id} />
  );
};
