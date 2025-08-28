import React from 'react';
import { useHuts } from '../../hooks/useHuts';
import { HutChecksGrid } from '../../components/hut/HutChecksTable';
import { GenericChecksPage } from '../../pages/Logs/GenericChecksPage';

const HutChecksPage: React.FC = () => (
    <GenericChecksPage
        entityName="Hut"
        useEntities={useHuts}
        entityKey="huts"
        isLoadingKey="isLoadingHuts"
        ChecksGrid={({ mountainId, entityId }) => (
            <HutChecksGrid mountainId={mountainId} hutId={entityId} />
        )}
    />
);

export default HutChecksPage;