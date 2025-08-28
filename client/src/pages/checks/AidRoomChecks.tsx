import * as React from 'react';
import { useAidRooms } from '../../hooks/useAidRooms';
import { AidRoomChecksGrid } from '../../components/aidRoom/AidRoomChecksTable';
import { GenericChecksPage } from '../../pages/checks/GenericChecksPage';

const AidRoomChecksPage: React.FC = () => (
    <GenericChecksPage
        entityName="Aid Room"
        useEntities={useAidRooms}
        entityKey="aidRooms"
        isLoadingKey="isLoadingAidRooms"
        ChecksGrid={({ mountainId, entityId }) => (
            <AidRoomChecksGrid mountainId={mountainId} aidRoomId={entityId} />
        )}
    />
);

export default AidRoomChecksPage;