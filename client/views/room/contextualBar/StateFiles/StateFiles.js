import React, { useMemo, useCallback } from 'react';
import { useUniqueId, useMutableCallback } from '@rocket.chat/fuselage-hooks';
import { Box, Button, Field, Select, TextInput, TextAreaInput, ToggleSwitch, InputBox, Chip, MultiSelectFiltered, UrlInput } from '@rocket.chat/fuselage';

import UserAutoCompleteMultiple from '../../../../../ee/client/audit/UserAutoCompleteMultiple';
import VerticalBar from '../../../../components/VerticalBar';
import Page from '../../../../components/Page';
import { useTranslation } from '../../../../contexts/TranslationContext';
import { useTabBarClose } from '../../providers/ToolboxProvider';
import { useForm } from '../../../../hooks/useForm';

const initialValues = {
	title: '',
	department: null,
	disposalRuleAuthority: null,
	authorityNumber: null,
	activityNumber: null,
	type: null,
	purpose: null,
	publicAccess: false,
	publicAccessType: null,
	description: '',
	files: [],
	users: [],
	tags: [],
	links: [],
};

const StateFiles = () => {
	const t = useTranslation();
	const onClickClose = useTabBarClose();
	const fileSourceInputId = useUniqueId();

	const { values, handlers } = useForm(initialValues);
	const {
		title,
		department,
		disposalRuleAuthority,
		authorityNumber,
		activityNumber,
		type,
		purpose,
		publicAccess,
		publicAccessType,
		description,
		files,
		users,
		links,
	} = values;

	const {
		handleTitle,
		handleDepartment,
		handleDisposalRuleAuthority,
		handleAuthorityNumber,
		handleActivityNumber,
		handleType,
		handlePurpose,
		handlePublicAccess,
		handlePublicAccessType,
		handleDescription,
		handleFiles,
		handleUsers,
		handleTags,
		handleLinks,
	} = handlers;

	const departmentOptions = useMemo(() => [
		['department-premier-cabinet', 'Department of Premier and Cabinet'],
	], [t]);

	const disposalRuleAuthorityOptions = useMemo(() => [
		['gda13', 'GDA13'],
	], [t]);

	const authorityNumberOptions = useMemo(() => [
		['fa254', 'FA254'],
	], [t]);

	const activityNumberOptions = useMemo(() => [
		['1.2.4', '1.2.4'],
	], [t]);

	const typeOptions = useMemo(() => [
		['meeting-formal', 'Meeting Formal'],
	], [t]);

	const purposeOptions = useMemo(() => [
		['approve-action', 'Approve Action'],
	], [t]);

	const publicAccessTypeOptions = useMemo(() => [
		['delayed-release', 'Delayed Release'],
	], [t]);

	const tagOptions = useMemo(() => [
		['teste1', 'Teste 1'],
		['teste2', 'Teste 2'],
	], [t]);

	const handleImportFileChange = async (event) => {
		event = event.originalEvent || event;

		let { files } = event.target;
		if (!files || (files.length === 0)) {
			files = (event.dataTransfer != null ? event.dataTransfer.files : undefined) || [];
		}

		handleFiles(Array.from(files));
	};

	const handleFileUploadChipClick = (file) => () => {
		handleFiles((files) => files.filter((_file) => _file !== file));
	};

	const onChangeUsers = useMutableCallback((value, action) => {
		if (!action) {
			if (users.includes(value)) {
				return;
			}
			return handleUsers([...users, value]);
		}
		handleUsers(users.filter((current) => current !== value));
	});

	const onUpload = useCallback(() => {
		console.log('onUpload', values);
	}, [values]);

	return (
		<>
			<VerticalBar.Header>
				<VerticalBar.Text>{t('create-state-record')}</VerticalBar.Text>
				<Button onClick={onUpload} small primary>{t('Save')}</Button>
				{ onClickClose && <VerticalBar.Close onClick={onClickClose} /> }
			</VerticalBar.Header>
			<Page.ScrollableContent p={null}>
				<VerticalBar.Section borderBlockEndWidth='x2' borderBlockColor='neutral-200'>
					<Field>
						<Field.Label>{t('Title')}</Field.Label>
						<Field.Row>
							<TextInput
								error={undefined}
								placeholder={t('Title')}
								value={title}
								onChange={handleTitle}
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
							<Field.Label>{t('Activity_Number')}</Field.Label>
							<Field.Row>
								<Select value={activityNumber} onChange={handleActivityNumber} options={activityNumberOptions} placeholder={t('Activity')} />
							</Field.Row>
						</Field>
					</Box>
				</VerticalBar.Section>
				<VerticalBar.Section borderBlockEndWidth='x2' borderBlockColor='neutral-200'>
					<Box display='flex' flexDirection='row' justifyContent='space-between'>
						<Field width='160px'>
							<Field.Label>{t('Type')}</Field.Label>
							<Field.Row>
								<Select value={type} onChange={handleType} options={typeOptions} placeholder={t('Type')} />
							</Field.Row>
						</Field>
						<Field width='160px'>
							<Field.Label>{t('Purpose')}</Field.Label>
							<Field.Row>
								<Select value={purpose} onChange={handlePurpose} options={purposeOptions} placeholder={t('Purpose')} />
							</Field.Row>
						</Field>
					</Box>
					<Field>
						<Field.Row>
							<Field.Label>{t('Public_Access')}</Field.Label>
							<ToggleSwitch checked={publicAccess} onChange={handlePublicAccess} />
						</Field.Row>
						<Field.Row>
							<Select value={publicAccessType} onChange={handlePublicAccessType} options={publicAccessTypeOptions} placeholder={t('Public_Access')} />
						</Field.Row>
					</Field>
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
						<Field.Label>{t('Attach_Documents')}</Field.Label>
						<InputBox type='file' id={fileSourceInputId} onChange={handleImportFileChange} />
						{files?.length > 0 && (
							<Field.Row>
								{files.map((file, i) => <Chip key={i} onClick={handleFileUploadChipClick(file)}>{file.name}</Chip>)}
							</Field.Row>
						)}
					</Field>
					<Field>
						<Field.Label>{t('Who_Was_Envolved')}</Field.Label>
						<UserAutoCompleteMultiple value={users} onChange={onChangeUsers} placeholder={t('Please_enter_usernames')} />
					</Field>
				</VerticalBar.Section>
				<VerticalBar.Section>
					<Field>
						<Field.Label>{t('Tags')}</Field.Label>
						<MultiSelectFiltered options={tagOptions} onChange={handleTags} />
					</Field>
					<Field>
						<Field.Label>{t('Links')}</Field.Label>
						<Field.Row>
							<UrlInput
								value={links}
								onChange={handleLinks}
							/>
						</Field.Row>
					</Field>
				</VerticalBar.Section>
			</Page.ScrollableContent>
		</>
	);
};

export default StateFiles;
