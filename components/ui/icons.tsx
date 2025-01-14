<<<<<<< HEAD
    // src/components/ui/icons.tsx
    import {
        AlertTriangle,
        ArrowRight,
        Check,
        ChevronLeft,
        ChevronRight,
        Command,
        CreditCard,
        File,
        FileText,
        Github,
        HelpCircle,
        Image,
        Laptop,
        Loader2,
        Moon,
        MoreVertical,
        Pizza,
        Plus,
        Settings,
        SunMedium,
        Trash,
        Twitter,
        User,
        X,
        Music,
        Mic2, 
        Video,
        Youtube,
        Instagram,
        Facebook,
        Mail,
        Lock,
        Eye,
        EyeOff,
        LogOut,
        Bell,
    } from "lucide-react";
    
    import type { LucideIcon, LucideProps } from "lucide-react";
    
    export type Icon = LucideIcon;
    
    export const Icons = {
        logo: Command,
        close: X,
        spinner: Loader2,
        chevronLeft: ChevronLeft,
        chevronRight: ChevronRight,
        trash: Trash,
        post: FileText,
        page: File,
        media: Image,
        settings: Settings,
        billing: CreditCard,
        ellipsis: MoreVertical,
        add: Plus,
        warning: AlertTriangle,
        user: User,
        arrowRight: ArrowRight,
        help: HelpCircle,
        pizza: Pizza,
        sun: SunMedium,
        moon: Moon,
        laptop: Laptop,
        gitHub: Github,
        twitter: Twitter,
        check: Check,
        music: Music,
        mic: Mic2,
        video: Video,
        youtube: Youtube,
        instagram: Instagram,
        facebook: Facebook,
        mail: Mail,
        lock: Lock,
        eye: Eye,
        eyeOff: EyeOff,
        logout: LogOut,
        bell: Bell,
    } as const;
    
    // Custom Google icon component
    export function Google({ ...props }: LucideProps) {
        return (
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            className={props.className}
            {...props}
        >
            <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
        </svg>
        );
    }
    
    // Export Google icon as part of Icons object
    Icons.google = Google;
    
=======
    // src/components/ui/icons.tsx
    import {
        AlertTriangle,
        ArrowRight,
        Check,
        ChevronLeft,
        ChevronRight,
        Command,
        CreditCard,
        File,
        FileText,
        Github,
        HelpCircle,
        Image,
        Laptop,
        Loader2,
        Moon,
        MoreVertical,
        Pizza,
        Plus,
        Settings,
        SunMedium,
        Trash,
        Twitter,
        User,
        X,
        Music,
        Mic2, 
        Video,
        Youtube,
        Instagram,
        Facebook,
        Mail,
        Lock,
        Eye,
        EyeOff,
        LogOut,
        Bell,
    } from "lucide-react";
    
    import type { LucideIcon, LucideProps } from "lucide-react";
    
    export type Icon = LucideIcon;
    
    export const Icons = {
        logo: Command,
        close: X,
        spinner: Loader2,
        chevronLeft: ChevronLeft,
        chevronRight: ChevronRight,
        trash: Trash,
        post: FileText,
        page: File,
        media: Image,
        settings: Settings,
        billing: CreditCard,
        ellipsis: MoreVertical,
        add: Plus,
        warning: AlertTriangle,
        user: User,
        arrowRight: ArrowRight,
        help: HelpCircle,
        pizza: Pizza,
        sun: SunMedium,
        moon: Moon,
        laptop: Laptop,
        gitHub: Github,
        twitter: Twitter,
        check: Check,
        music: Music,
        mic: Mic2,
        video: Video,
        youtube: Youtube,
        instagram: Instagram,
        facebook: Facebook,
        mail: Mail,
        lock: Lock,
        eye: Eye,
        eyeOff: EyeOff,
        logout: LogOut,
        bell: Bell,
    } as const;
    
    // Custom Google icon component
    export function Google({ ...props }: LucideProps) {
        return (
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
            className={props.className}
            {...props}
        >
            <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            />
        </svg>
        );
    }
    
    // Export Google icon as part of Icons object
    Icons.google = Google;
    
>>>>>>> 0c527ff82d31ad2f2bda4912cf7bb385822419f8
    export { type LucideProps };