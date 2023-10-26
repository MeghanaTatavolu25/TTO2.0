import React, { useEffect } from 'react'
import { ApiClient }        from 'adminjs'
import { Loader }           from '@adminjs/design-system'

const GeneratePdf = (props) => {
  const { record, resource } = props;
  const api = new ApiClient();

  useEffect(() => {
    api
      .recordAction({
        recordId: record.id,
        resourceId: resource.id,
        actionName: 'PDFGenerator',
      })
      .then((response) => {
        window.location.href = response.data.url;
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return React.createElement(Loader, null);
};

export default GeneratePdf;
