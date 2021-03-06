// @flow

import React, { PureComponent } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { translate } from 'react-i18next'
import { createStructuredSelector } from 'reselect'

import type { Currency, Account } from '@ledgerhq/live-common/lib/types'

import type { T, Device } from 'types/common'

import { getCurrentDevice } from 'reducers/devices'
import { accountsSelector } from 'reducers/accounts'
import { addAccount } from 'actions/accounts'
import { closeModal } from 'reducers/modals'

import Modal, { ModalContent, ModalTitle, ModalFooter, ModalBody } from 'components/base/Modal'
import Box from 'components/base/Box'
import Breadcrumb from 'components/Breadcrumb'

import StepChooseCurrency, { StepChooseCurrencyFooter } from './steps/01-step-choose-currency'
import StepConnectDevice, { StepConnectDeviceFooter } from './steps/02-step-connect-device'
import StepImport, { StepImportFooter } from './steps/03-step-import'
import StepFinish from './steps/04-step-finish'

const createSteps = ({ t }: { t: T }) => [
  {
    id: 'chooseCurrency',
    label: t('importAccounts:breadcrumb.informations'),
    component: StepChooseCurrency,
    footer: StepChooseCurrencyFooter,
    onBack: null,
    hideFooter: false,
  },
  {
    id: 'connectDevice',
    label: t('importAccounts:breadcrumb.connectDevice'),
    component: StepConnectDevice,
    footer: StepConnectDeviceFooter,
    onBack: ({ transitionTo }: StepProps) => transitionTo('chooseCurrency'),
    hideFooter: false,
  },
  {
    id: 'import',
    label: t('importAccounts:breadcrumb.import'),
    component: StepImport,
    footer: StepImportFooter,
    onBack: ({ transitionTo }: StepProps) => transitionTo('chooseCurrency'),
    hideFooter: false,
  },
  {
    id: 'finish',
    label: t('importAccounts:breadcrumb.finish'),
    component: StepFinish,
    footer: null,
    onBack: null,
    hideFooter: true,
  },
]

type Props = {
  t: T,
  currentDevice: ?Device,
  existingAccounts: Account[],
  closeModal: string => void,
  addAccount: Account => void,
}

type StepId = 'chooseCurrency' | 'connectDevice' | 'import' | 'finish'

type ScanStatus = 'idle' | 'scanning' | 'error' | 'finished'

type State = {
  stepId: StepId,
  isAppOpened: boolean,
  currency: ?Currency,

  // scan process
  scannedAccounts: Account[],
  checkedAccountsIds: string[],
  scanStatus: ScanStatus,
  err: ?Error,
}

export type StepProps = {
  t: T,
  currency: ?Currency,
  currentDevice: ?Device,
  isAppOpened: boolean,
  transitionTo: StepId => void,
  setState: any => void,
  onClickImport: void => Promise<void>,
  onCloseModal: void => void,

  // scan process
  scannedAccounts: Account[],
  existingAccounts: Account[],
  checkedAccountsIds: string[],
  scanStatus: ScanStatus,
  err: ?Error,
}

const mapStateToProps = createStructuredSelector({
  currentDevice: getCurrentDevice,
  existingAccounts: accountsSelector,
})

const mapDispatchToProps = {
  addAccount,
  closeModal,
}

const INITIAL_STATE = {
  stepId: 'chooseCurrency',
  isAppOpened: false,
  currency: null,
  scannedAccounts: [],
  checkedAccountsIds: [],
  err: null,
  scanStatus: 'idle',
}

class ImportAccounts extends PureComponent<Props, State> {
  state = INITIAL_STATE
  STEPS = createSteps({
    t: this.props.t,
  })

  transitionTo = stepId => {
    let nextState = { stepId }
    if (stepId === 'chooseCurrency') {
      nextState = { ...INITIAL_STATE }
    }
    this.setState(nextState)
  }

  handleClickImport = async () => {
    const { addAccount } = this.props
    const { scannedAccounts, checkedAccountsIds } = this.state
    const accountsIdsMap = checkedAccountsIds.reduce((acc, cur) => {
      acc[cur] = true
      return acc
    }, {})
    const accountsToImport = scannedAccounts.filter(account => accountsIdsMap[account.id] === true)
    for (let i = 0; i < accountsToImport.length; i++) {
      await idleCallback()
      addAccount(accountsToImport[i])
    }
    this.transitionTo('finish')
  }

  handleCloseModal = () => {
    const { closeModal } = this.props
    closeModal('importAccounts')
  }

  render() {
    const { t, currentDevice, existingAccounts } = this.props
    const {
      stepId,
      currency,
      isAppOpened,
      scannedAccounts,
      checkedAccountsIds,
      scanStatus,
      err,
    } = this.state

    const stepIndex = this.STEPS.findIndex(s => s.id === stepId)
    const step = this.STEPS[stepIndex]

    if (!step) {
      throw new Error(`ImportAccountsModal: step ${stepId} doesn't exists`)
    }

    const { component: StepComponent, footer: StepFooter, hideFooter, onBack } = step

    const stepProps: StepProps = {
      t,
      currency,
      currentDevice,
      existingAccounts,
      scannedAccounts,
      checkedAccountsIds,
      scanStatus,
      err,
      isAppOpened,
      onClickImport: this.handleClickImport,
      onCloseModal: this.handleCloseModal,
      transitionTo: this.transitionTo,
      setState: (...args) => this.setState(...args),
    }

    return (
      <Modal
        name="importAccounts"
        preventBackdropClick
        onHide={() => this.setState({ ...INITIAL_STATE })}
        render={({ onClose }) => (
          <ModalBody onClose={onClose}>
            <ModalTitle onBack={onBack ? () => onBack(stepProps) : void 0}>
              {t('importAccounts:title')}
            </ModalTitle>
            <ModalContent>
              <Breadcrumb mb={6} currentStep={stepIndex} items={this.STEPS} />
              <StepComponent {...stepProps} />
            </ModalContent>
            {!hideFooter && (
              <ModalFooter horizontal align="center" justify="flex-end" style={{ height: 80 }}>
                {StepFooter ? <StepFooter {...stepProps} /> : <Box>footer</Box>}
              </ModalFooter>
            )}
          </ModalBody>
        )}
      />
    )
  }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), translate())(ImportAccounts)

function idleCallback() {
  return new Promise(resolve => window.requestIdleCallback(resolve))
}
