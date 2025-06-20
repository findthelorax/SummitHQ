import React, { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useMountain } from '../../contexts/MountainContext';
import { liftApi } from '../../api/LiftAPI';
import { trailApi } from '../../api/TrailAPI';
import { lodgeApi } from '../../api/LodgeAPI';
import { hutApi } from '../../api/HutAPI';
import { aidRoomApi } from '../../api/AidRoomAPI';

import type { LiftDTO, TrailDTO, LodgeDTO, HutDTO, AidRoomDTO } from '../../types/index';
import { STATUS, STATUS_LABELS } from '../../types/generated-enums';
import { useSnackbarContext } from '../../contexts/SnackbarContext';

type StatusControlProps = {
    value: STATUS;
    data: LiftDTO | TrailDTO | LodgeDTO | HutDTO | AidRoomDTO;
    type: 'lift' | 'trail' | 'lodge' | 'hut' | 'aidRoom';
    onStatusChange?: () => void;
};

const toNumberOrNull = (val: any) =>
    val === null || val === undefined ? null : typeof val === 'number' ? val : Number(val);

const typeConfig = {
    lift: {
        api: liftApi.updateLift,
        fields: ['name', 'type', 'capacity', 'latitude', 'longitude'],
    },
    trail: {
        api: trailApi.updateTrail,
        fields: ['name', 'difficulty', 'length', 'condition', 'latitude', 'longitude'],
    },
    lodge: {
        api: lodgeApi.updateLodge,
        fields: ['name', 'capacity', 'latitude', 'longitude'],
    },
    hut: {
        api: hutApi.updateHut,
        fields: ['name', 'latitude', 'longitude'],
    },
    aidRoom: {
        api: aidRoomApi.updateAidRoom,
        fields: ['name', 'latitude', 'longitude'],
    },
} as const;

export const StatusToggleButton: React.FC<StatusControlProps> = ({ value, data, type, onStatusChange }) => {
    const { selectedMountain } = useMountain();
    const { showSnackbar } = useSnackbarContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [holdModalOpen, setHoldModalOpen] = useState(false);

    const newStatus = value === STATUS.OPEN ? STATUS.CLOSED : STATUS.OPEN;

    const yesRef = useRef<HTMLButtonElement>(null);
    const cancelRef = useRef<HTMLButtonElement>(null);
    const holdYesRef = useRef<HTMLButtonElement>(null);
    const holdCancelRef = useRef<HTMLButtonElement>(null);

    const handleConfirm = async () => {
        if (!selectedMountain) return;
        const config = typeConfig[type];
        const updatedItem: any = { status: newStatus };

        for (const field of config.fields) {
            updatedItem[field] =
                field === 'latitude' || field === 'longitude'
                    ? toNumberOrNull((data as any)[field])
                    : (data as any)[field];
        }

        try {
            await config.api(selectedMountain.id, (data as any).id, updatedItem);
            showSnackbar(
                `${data.name} updated to "${STATUS_LABELS[newStatus as keyof typeof STATUS_LABELS] ?? newStatus}".`,
                'success'
            );
            onStatusChange?.();
        } catch (err) {
            showSnackbar(
                `Failed to update ${data.name} to "${
                    STATUS_LABELS[newStatus as keyof typeof STATUS_LABELS] ?? newStatus
                }".`,
                'error'
            );
        }
        setModalOpen(false);
    };

    const handleHold = async () => {
        if (!selectedMountain) return;
        const config = typeConfig[type];
        const updatedItem: any = { status: STATUS.ON_HOLD };

        for (const field of config.fields) {
            updatedItem[field] =
                field === 'latitude' || field === 'longitude'
                    ? toNumberOrNull((data as any)[field])
                    : (data as any)[field];
        }

        try {
            await config.api(selectedMountain.id, (data as any).id, updatedItem);
            showSnackbar(
                `${data.name} updated to "${STATUS_LABELS[STATUS.ON_HOLD] ?? STATUS.ON_HOLD}".`,
                'success'
            );
            onStatusChange?.();
        } catch (err) {
            showSnackbar(
                `Failed to update ${data.name} to "${
                    STATUS_LABELS[STATUS.ON_HOLD] ?? STATUS.ON_HOLD
                }".`,
                'error'
            );
        }
        setHoldModalOpen(false);
    };

    const statusBtnClass = value === STATUS.OPEN ? 'status-btn status-btn--open' : 'status-btn status-btn--closed';
    const modalBtnClass = newStatus === STATUS.OPEN ? 'modal-btn modal-btn--open' : 'modal-btn modal-btn--closed';

    useLayoutEffect(() => {
        if (modalOpen) {
            requestAnimationFrame(() => {
                yesRef.current?.focus();
            });
        }
        if (holdModalOpen) {
            requestAnimationFrame(() => {
                holdYesRef.current?.focus();
            });
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (modalOpen) {
                if (e.key === 'Tab') {
                    const focusable = [yesRef.current, cancelRef.current].filter(Boolean) as HTMLElement[];
                    const first = focusable[0];
                    const last = focusable[focusable.length - 1];
                    if (e.shiftKey) {
                        if (document.activeElement === first) {
                            e.preventDefault();
                            last.focus();
                        }
                    } else {
                        if (document.activeElement === last) {
                            e.preventDefault();
                            first.focus();
                        }
                    }
                } else if (e.key === 'Escape') {
                    setModalOpen(false);
                }
            }
            if (holdModalOpen) {
                if (e.key === 'Tab') {
                    const focusable = [holdYesRef.current, holdCancelRef.current].filter(Boolean) as HTMLElement[];
                    const first = focusable[0];
                    const last = focusable[focusable.length - 1];
                    if (e.shiftKey) {
                        if (document.activeElement === first) {
                            e.preventDefault();
                            last.focus();
                        }
                    } else {
                        if (document.activeElement === last) {
                            e.preventDefault();
                            first.focus();
                        }
                    }
                } else if (e.key === 'Escape') {
                    setHoldModalOpen(false);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [modalOpen, holdModalOpen]);

    return (
        <>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                    className={statusBtnClass}
                    onClick={(e) => {
                        e.stopPropagation();
                        setModalOpen(true);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    type="button"
                >
                    {STATUS_LABELS[value as keyof typeof STATUS_LABELS] ?? value}
                </button>
                <button
                    className="status-btn status-btn--hold"
                    style={{ minWidth: 100 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setHoldModalOpen(true);
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    type="button"
                >
                    {STATUS_LABELS[STATUS.ON_HOLD] ?? 'On Hold'}
                </button>
            </div>
            {modalOpen &&
                createPortal(
                    <div className="modal-overlay" onClick={() => setModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <p>
                                Are you sure you want to <b>{newStatus === STATUS.OPEN ? 'open' : 'close'}</b>{' '}
                                <b>{data.name}</b>?
                            </p>
                            <div className="modal-actions">
                                <button
                                    ref={yesRef}
                                    onClick={handleConfirm}
                                    className={modalBtnClass}
                                >
                                    Yes
                                </button>
                                <button
                                    ref={cancelRef}
                                    onClick={() => setModalOpen(false)}
                                    className="modal-btn modal-btn--cancel"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
            {holdModalOpen &&
                createPortal(
                    <div className="modal-overlay" onClick={() => setHoldModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <p>
                                Are you sure you want to put <b>{data.name}</b> <b>on hold</b>?
                            </p>
                            <div className="modal-actions">
                                <button
                                    ref={holdYesRef}
                                    onClick={handleHold}
                                    className="modal-btn modal-btn--hold"
                                >
                                    Yes
                                </button>
                                <button
                                    ref={holdCancelRef}
                                    onClick={() => setHoldModalOpen(false)}
                                    className="modal-btn modal-btn--cancel"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
};

export const StatusDropdown: React.FC<StatusControlProps> = ({ value, data, type, onStatusChange }) => {
    const { selectedMountain } = useMountain();
    const { showSnackbar } = useSnackbarContext();

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!selectedMountain) return;
        const newStatus = e.target.value as STATUS;
        const config = typeConfig[type];
        const updatedItem: any = { status: newStatus };

        for (const field of config.fields) {
            updatedItem[field] =
                field === 'latitude' || field === 'longitude'
                    ? toNumberOrNull((data as any)[field])
                    : (data as any)[field];
        }

        try {
            await config.api(selectedMountain.id, (data as any).id, updatedItem);
            showSnackbar(
                `${data.name} updated to "${STATUS_LABELS[newStatus as keyof typeof STATUS_LABELS] ?? newStatus}".`,
                'success'
            );
            onStatusChange?.();
        } catch (err) {
            showSnackbar(
                `Failed to update ${data.name} to "${
                    STATUS_LABELS[newStatus as keyof typeof STATUS_LABELS] ?? newStatus
                }".`,
                'error'
            );
        }
    };

    return (
        <div className="status-dropdown-container">
            <select value={value} onChange={handleChange} className="dropdown status-dropdown">
                {Object.values(STATUS).map((status) => (
                    <option key={status} value={status}>
                        {STATUS_LABELS[status as keyof typeof STATUS_LABELS] ?? status}
                    </option>
                ))}
            </select>
        </div>
    );
};