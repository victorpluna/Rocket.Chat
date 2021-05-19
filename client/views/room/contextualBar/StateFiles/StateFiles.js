import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Box, Button, Field, Select, TextInput, TextAreaInput, MultiSelectFiltered, Skeleton } from '@rocket.chat/fuselage';

import VerticalBar from '../../../../components/VerticalBar';
import Page from '../../../../components/Page';
import { useTranslation } from '../../../../contexts/TranslationContext';
import { useTabBarClose } from '../../providers/ToolboxProvider';
import { useForm } from '../../../../hooks/useForm';
import { useEndpointAction } from '../../../../hooks/useEndpointAction';

const initialValues = {
	name: '',
	department: null,
	disposalRuleAuthority: null,
	authorityNumber: null,
	disposalClassId: null,
	description: '',
	jurisdiction: null,
	securityClassification: null,
	caveatCategory: null,
	caveat: '',
	permissionType: null,
	permission: null,
	rightsType: null,
	rightsStatus: null,
	keywords: [],
	location: null,
	documentForm: null,
	purpose: null,
	limitingMarkers: null,
};

const StateFiles = ({ rid }) => {
	const [formValues, setFormValues] = useState(initialValues);
	const [isLoading, setIsLoading] = useState(true);

	const getRoomInfo = useEndpointAction('GET', 'rooms.info', { roomId: rid });
	// const saveGroupMetadata = useEndpointAction('POST', 'groups.setCustomFields');
	const saveChannelMetadata = useEndpointAction('POST', 'channels.setCustomFields');
	// const saveLivechat = useEndpointAction('POST', 'livechat/custom.fields');
	const t = useTranslation();
	const onClickClose = useTabBarClose();

	useEffect(() => {
		const getRoomInfoAction = async () => {
			const response = await getRoomInfo();
			setFormValues({ ...initialValues, ...response.room.customFields });
			setIsLoading(false);
		};

		getRoomInfoAction();
	}, []);

	const onUpload = useCallback(async (values) => {
		// await saveGroupMetadata({ roomId: rid, customFields: values });
		await saveChannelMetadata({ roomId: rid, customFields: values });
	}, [rid, saveChannelMetadata]);

	if (isLoading) {
		return <Skeleton />;
	}

	return (
		<>
			<VerticalBar.Header>
				<VerticalBar.Text>{t('Chat_Metadata')}</VerticalBar.Text>
				{ onClickClose && <VerticalBar.Close onClick={onClickClose} /> }
			</VerticalBar.Header>
			<Page.ScrollableContent p={null}>
				<MetadataForm formValues={formValues} onUpload={onUpload} />
			</Page.ScrollableContent>
		</>
	);
};

const MetadataForm = ({ formValues, onUpload }) => {
	const t = useTranslation();
	const { values, handlers } = useForm(formValues);

	const {
		name,
		department,
		disposalRuleAuthority,
		authorityNumber,
		disposalClassId,
		description,
		jurisdiction,
		securityClassification,
		caveatCategory,
		caveat,
		permissionType,
		permission,
		rightsType,
		rightsStatus,
		// keywords,
		location,
		documentForm,
		purpose,
		limitingMarkers,
	} = values;

	const {
		handleName,
		handleDepartment,
		handleDisposalRuleAuthority,
		handleAuthorityNumber,
		handleDisposalClassId,
		handleDescription,
		handleJurisdiction,
		handleSecurityClassification,
		handleCaveatCategory,
		handleCaveat,
		handlePermissionType,
		handlePermission,
		handleRightsType,
		handleRightsStatus,
		handleKeywords,
		handleLocation,
		handleDocumentForm,
		handlePurpose,
		handleLimitingMarkers,
	} = handlers;

	const departmentOptions = useMemo(() => [
		['department-premier-cabinet', 'Department of Premier and Cabinet'],
	], []);

	const disposalRuleAuthorityOptions = useMemo(() => [
		['gda13', 'GDA13'],
	], []);

	const authorityNumberOptions = useMemo(() => [
		['fa254', 'FA254'],
	], []);

	const disposalClassIdOptions = useMemo(() => [
		['1.2.4', '1.2.4'],
	], []);

	const jurisdictionOptions = useMemo(() => [
		['au', 'AU'],
	], []);

	const securityClassificationOptions = useMemo(() => [
		['confidential', 'Confidential'],
	], []);

	const caveatCategoryOptions = useMemo(() => [
		['agao', 'AGAO'],
	], []);

	const permissionTypeOptions = useMemo(() => [
		['record-keeping', 'Record Keeping'],
	], []);

	const permissionOptions = useMemo(() => [
		['official-sensitive-security', 'Official - sensitive - Security clearance'],
	], []);

	const rightsTypeOptions = useMemo(() => [
		['intellectual-property', 'Intellectual Property'],
	], []);

	const rightsStatusOptions = useMemo(() => [
		['released-under-foi', 'Mey be released under FOI'],
	], []);

	const locationOptions = useMemo(() => [
		['canberra-AU', 'Canberra, Australia'],
	], []);

	const documentFormOptions = useMemo(() => [
		['meeting-minutes', 'Meeting Minutes'],
	], []);

	const purposeOptions = useMemo(() => [
		['approve-action', 'Approve Action'],
	], []);

	const limitingMarkersOptions = useMemo(() => [
		['sensitive-cabinet', 'Sensitive: Cabinet'],
	], []);

	const keywordsOptions = useMemo(() => [
		['teste1', 'Teste 1'],
		['teste2', 'Teste 2'],
	], []);

	return (
		<VerticalBar.Section borderBlockEndWidth='x2' borderBlockColor='neutral-200'>
			<Field>
				<Field.Label>{t('Name')}</Field.Label>
				<Field.Row>
					<TextInput
						error={undefined}
						placeholder={t('Name')}
						value={name}
						onChange={handleName}
					/>
				</Field.Row>
			</Field>
			<Field>
				<Field.Label>{t('Department')}</Field.Label>
				<Field.Row>
					<Select value={department} onChange={handleDepartment} options={departmentOptions} placeholder={t('Department')} />
				</Field.Row>
			</Field>
			<Field>
				<Field.Label>{t('Disposal_Rule_Authority')}</Field.Label>
				<Field.Row>
					<Select value={disposalRuleAuthority} onChange={handleDisposalRuleAuthority} options={disposalRuleAuthorityOptions} placeholder={t('Disposal_Rule_Authority')} />
				</Field.Row>
			</Field>
			<Box display='flex' flexDirection='row' justifyContent='space-between'>
				<Field width='160px'>
					<Field.Label>{t('Authority_Number')}</Field.Label>
					<Field.Row>
						<Select value={authorityNumber} onChange={handleAuthorityNumber} options={authorityNumberOptions} placeholder={t('Authority')} />
					</Field.Row>
				</Field>
				<Field width='160px'>
					<Field.Label>{t('Disposal_Class_Id')}</Field.Label>
					<Field.Row>
						<Select value={disposalClassId} onChange={handleDisposalClassId} options={disposalClassIdOptions} placeholder={t('Class_Id')} />
					</Field.Row>
				</Field>
			</Box>
			<Field>
				<Field.Label>{t('Description')}</Field.Label>
				<Field.Row>
					<TextAreaInput
						error={undefined}
						placeholder={t('Description')}
						value={description}
						onChange={handleDescription}
					/>
				</Field.Row>
			</Field>

			<Field>
				<Field.Label>{t('Jurisdiction')}</Field.Label>
				<Field.Row>
					<Select value={jurisdiction} onChange={handleJurisdiction} options={jurisdictionOptions} placeholder={t('Jurisdiction')} />
				</Field.Row>
			</Field>
			<Box display='flex' flexDirection='row' justifyContent='space-between'>
				<Field width='160px'>
					<Field.Label>{t('Security_Classification')}</Field.Label>
					<Field.Row>
						<Select value={securityClassification} onChange={handleSecurityClassification} options={securityClassificationOptions} placeholder={t('Classification')} />
					</Field.Row>
				</Field>
				<Field width='160px'>
					<Field.Label>{t('Caveat_Category')}</Field.Label>
					<Field.Row>
						<Select value={caveatCategory} onChange={handleCaveatCategory} options={caveatCategoryOptions} placeholder={t('Category')} />
					</Field.Row>
				</Field>
			</Box>
			<Field>
				<Field.Label>{t('Caveat')}</Field.Label>
				<Field.Row>
					<TextInput
						error={undefined}
						placeholder={t('Caveat')}
						value={caveat}
						onChange={handleCaveat}
					/>
				</Field.Row>
			</Field>
			<Field>
				<Field.Label>{t('Permission_Type')}</Field.Label>
				<Field.Row>
					<Select value={permissionType} onChange={handlePermissionType} options={permissionTypeOptions} placeholder={t('Permission_Type')} />
				</Field.Row>
			</Field>
			<Field>
				<Field.Label>{t('Permission')}</Field.Label>
				<Field.Row>
					<Select value={permission} onChange={handlePermission} options={permissionOptions} placeholder={t('Permission')} />
				</Field.Row>
			</Field>
			<Field>
				<Field.Label>{t('Rights_Type')}</Field.Label>
				<Field.Row>
					<Select value={rightsType} onChange={handleRightsType} options={rightsTypeOptions} placeholder={t('Rights_Type')} />
				</Field.Row>
			</Field>
			<Field>
				<Field.Label>{t('Rights_Status_Scheme')}</Field.Label>
				<Field.Row>
					<Select value={rightsStatus} onChange={handleRightsStatus} options={rightsStatusOptions} placeholder={t('Rights_Status_Scheme')} />
				</Field.Row>
			</Field>
			<Field>
				<Field.Label>{t('Keywords')}</Field.Label>
				<MultiSelectFiltered options={keywordsOptions} onChange={handleKeywords} />
			</Field>
			<Field>
				<Field.Label>{t('Location')}</Field.Label>
				<Field.Row>
					<Select value={location} onChange={handleLocation} options={locationOptions} placeholder={t('Location')} />
				</Field.Row>
			</Field>
			<Field>
				<Field.Label>{t('Document_Form')}</Field.Label>
				<Field.Row>
					<Select value={documentForm} onChange={handleDocumentForm} options={documentFormOptions} placeholder={t('Document_Form')} />
				</Field.Row>
			</Field>
			<Field>
				<Field.Label>{t('Purpose')}</Field.Label>
				<Field.Row>
					<Select value={purpose} onChange={handlePurpose} options={purposeOptions} placeholder={t('Purpose')} />
				</Field.Row>
			</Field>
			<Field>
				<Field.Label>{t('Dissemination_Limiting_Markers')}</Field.Label>
				<Field.Row>
					<Select value={limitingMarkers} onChange={handleLimitingMarkers} options={limitingMarkersOptions} placeholder={t('Dissemination_Limiting_Markers')} />
				</Field.Row>
			</Field>
			<Field>
				<Button onClick={() => onUpload(values)} primary>{t('Save')}</Button>
			</Field>
		</VerticalBar.Section>
	);
};

export default StateFiles;
