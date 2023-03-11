import DesignerForm from '@/components/designer/form';
import DesignerTable from '@/components/designer/table';

export default ({ type, schemaId, searchParams }: any) => {
  const _type = searchParams?.type || type;
  const _schemaId = searchParams?.schemaId || schemaId;
  return _type === 'form' ? (
    <DesignerForm schemaId={_schemaId} />
  ) : (
    <DesignerTable schemaId={_schemaId} />
  );
};
