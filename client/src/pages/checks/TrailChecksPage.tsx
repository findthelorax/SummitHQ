import * as React from 'react';
import { useTrails } from '../../hooks/useTrails';
import { TrailChecksGrid } from '../../components/trail/TrailCheckTableTwo';
import { GenericChecksPage } from './GenericChecksPage';

const TrailChecksPage: React.FC = () => (
    <GenericChecksPage
        entityName="Trail"
        useEntities={useTrails}
        entityKey="trails"
        isLoadingKey="isLoadingTrails"
        ChecksGrid={({ mountainId, entityId }) => (
            <TrailChecksGrid mountainId={mountainId} trailId={entityId} />
        )}
    />
);

export default TrailChecksPage;