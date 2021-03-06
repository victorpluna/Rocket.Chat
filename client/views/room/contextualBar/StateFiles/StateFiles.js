import React, { useState } from 'react';
import { useUniqueId, useMutableCallback } from '@rocket.chat/fuselage-hooks';
import { Box, Button, Field, Select, TextInput, TextAreaInput, ToggleSwitch, InputBox, Chip } from '@rocket.chat/fuselage';

import UserAutoCompleteMultiple from '../../../../../ee/client/audit/UserAutoCompleteMultiple';
import VerticalBar from '../../../../components/VerticalBar';
import { useTranslation } from '../../../../contexts/TranslationContext';
import { useTabBarClose } from '../../providers/ToolboxProvider';

const StateFiles = () => {
	const t = useTranslation();
	const onClickClose = useTabBarClose();
	const fileSourceInputId = useUniqueId();

	const [files, setFiles] = useState([]);
	const [users, setUsers] = useState([]);

	const handleImportFileChange = async (event) => {
		event = event.originalEvent || event;

		let { files } = event.target;
		if (!files || (files.length === 0)) {
			files = (event.dataTransfer != null ? event.dataTransfer.files : undefined) || [];
		}

		setFiles(Array.from(files));
	};

	const handleFileUploadChipClick = (file) => () => {
		setFiles((files) => files.filter((_file) => _file !== file));
	};

	const onChangeUsers = useMutableCallback((value, action) => {
		if (!action) {
			if (users.includes(value)) {
				return;
			}
			return setUsers([...users, value]);
		}
		setUsers(users.filter((current) => current !== value));
	});

	return (
		<>
			<VerticalBar.Header>
				<VerticalBar.Text>{t('create-state-record')}</VerticalBar.Text>
				<Button small primary>{t('Save')}</Button>
				{ onClickClose && <VerticalBar.Close onClick={onClickClose} /> }
			</VerticalBar.Header>
			<VerticalBar.ScrollableContent>
				<Field>
					<Field.Label>{t('Title')}</Field.Label>
					<Field.Row>
						<TextInput
							error={undefined}
							placeholder={t('Title')}
							onChange={() => {}}
						/>
					</Field.Row>
				</Field>
				<Field>
					<Field.Label>{t('Department')}</Field.Label>
					<Field.Row>
						<Select value={null} onChange={() => {}} options={[]} placeholder={t('Department')} />
					</Field.Row>
				</Field>
				<Field>
					<Field.Label>{t('Disposal_Rule_Authority')}</Field.Label>
					<Field.Row>
						<Select value={null} onChange={() => {}} options={[]} placeholder={t('Disposal_Rule_Authority')} />
					</Field.Row>
				</Field>
				<Box display='flex' flexDirection='row' justifyContent='space-between'>
					<Field width='160px'>
						<Field.Label>{t('Type')}</Field.Label>
						<Field.Row>
							<Select value={null} onChange={() => {}} options={[]} placeholder={t('Type')} />
						</Field.Row>
					</Field>
					<Field width='160px'>
						<Field.Label>{t('Purpose')}</Field.Label>
						<Field.Row>
							<Select value={null} onChange={() => {}} options={[]} placeholder={t('Purpose')} />
						</Field.Row>
					</Field>
				</Box>
				<Field>
					<Field.Row>
						<Field.Label>{t('Public_Access')}</Field.Label>
						<ToggleSwitch checked={true} onChange={() => {}} />
					</Field.Row>
					<Field.Row>
						<Select value={null} onChange={() => {}} options={[]} placeholder={t('Public_Access')} />
					</Field.Row>
				</Field>
				<Field>
					<Field.Label>{t('Description')}</Field.Label>
					<Field.Row>
						<TextAreaInput
							error={undefined}
							placeholder={t('Description')}
							onChange={() => {}}
						/>
					</Field.Row>
				</Field>
				<Field>
					<Field.Label>{t('Attach_Documents')}</Field.Label>
					<Field.Row>
						<InputBox type='file' id={fileSourceInputId} onChange={handleImportFileChange} />
					</Field.Row>
					{files?.length > 0 && (
						<Field.Row>
							{files.map((file, i) => <Chip key={i} onClick={handleFileUploadChipClick(file)}>{file.name}</Chip>)}
						</Field.Row>
					)}
				</Field>
				<Field>
					<Field.Label>{t('Who_Was_Envolved')}</Field.Label>
					<Field.Row>
						<UserAutoCompleteMultiple value={users} onChange={onChangeUsers} placeholder={t('Please_enter_usernames')} />
					</Field.Row>
				</Field>
			</VerticalBar.ScrollableContent>
		</>
	);
};

export default StateFiles;
