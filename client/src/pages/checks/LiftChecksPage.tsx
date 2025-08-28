import React from 'react';
import { useLifts } from '../../hooks/useLifts';
import { LiftChecksGrid } from '../../components/lift/LiftChecksTable';
import { GenericChecksPage } from '../../pages/Logs/GenericChecksPage';

const LiftChecksPage: React.FC = () => (
    <GenericChecksPage
        entityName="Lift"
        useEntities={useLifts}
        entityKey="lifts"
        isLoadingKey="isLoadingLifts"
        ChecksGrid={({ mountainId, entityId }) => (
            <LiftChecksGrid mountainId={mountainId} liftId={entityId} />
        )}
    />
);

export default LiftChecksPage;