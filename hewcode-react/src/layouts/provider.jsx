import App from '../components/app.jsx';
import { ModalRenderer } from '../components/modal-renderer';
import { Toaster } from '../components/ui/sonner';
import { LocaleProvider } from '../contexts/locale-context';
import { ModalProvider } from '../contexts/modal-context';

export default function HewcodeProvider({ children, ...props }) {
  const { hewcode } = props.initialPage.props;

  return (
    <LocaleProvider locale={hewcode.locale}>
      <ModalProvider>
        <App toasts={hewcode.toasts}>{children}</App>
        <ModalRenderer />
        <Toaster closeButton richColors />
      </ModalProvider>
    </LocaleProvider>
  );
}
