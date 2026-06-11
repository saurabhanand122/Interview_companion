'use client';

import {useEffect, useRef, useState} from 'react'
import {cn, configureAssistant, getSubjectColor} from "@/lib/utils";
import {vapi} from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import soundwaves from '@/constants/soundwaves.json'
import {addToSessionHistory} from "@/lib/actions/companion.actions";
import { Mic, MicOff, Phone, PhoneOff, Sparkles } from "lucide-react";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const getStarterPrompts = (subject: string) => {
    switch (subject?.toLowerCase()) {
        case 'maths':
            return [
                "Can you explain derivatives in simple terms?",
                "Give me a quick algebra puzzle to solve.",
                "How do integrals relate to area under a curve?",
                "Test my knowledge with a maths question."
            ];
        case 'coding':
            return [
                "What is the difference between let and const?",
                "Explain how array mapping works in JavaScript.",
                "Can you explain recursion using an analogy?",
                "Give me a beginner coding challenge."
            ];
        case 'science':
            return [
                "How does neural transmission work in the brain?",
                "Explain the double-slit experiment simply.",
                "What is the concept of entropy in thermodynamics?",
                "Give me a science trivia question."
            ];
        case 'language':
            return [
                "Help me practice conversational English.",
                "Give me a vocabulary challenge about science terms.",
                "What are some common idioms and their meanings?",
                "How can I improve my pronunciation?"
            ];
        case 'history':
            return [
                "What were the primary causes of World War I?",
                "Tell me about the construction of the Great Wall.",
                "Explain the significance of the Magna Carta.",
                "Quiz me on ancient history."
            ];
        case 'economics':
            return [
                "Explain supply and demand with a real-life example.",
                "What is inflation and how does it happen?",
                "What's the difference between micro and macroeconomics?",
                "Ask me an economics trivia question."
            ];
        default:
            return [
                "Can you explain the main concept of this topic?",
                "Give me a simple example of what we are studying.",
                "Ask me a question to test my understanding.",
                "What are some common mistakes students make here?"
            ];
    }
};

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if (isSpeaking) {
            lottieRef.current?.play();
        } else {
            lottieRef.current?.stop();
        }
    }, [isSpeaking]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            addToSessionHistory(companionId)
        }

        const onMessage = (message: Message) => {
            if(message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage= { role: message.role, content: message.transcript}
                setMessages((prev) => [newMessage, ...prev])
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log('Error', error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    }, [companionId]);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted)
    }

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ["transcript"],
            serverMessages: [],
        }

        // @ts-expect-error vapi.start signature mismatch
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    const subjColor = getSubjectColor(subject) || "#7c3aed";
    const companionFirstName = name.split(' ')[0].replace(/[.,]/g, '');

    return (
        <section className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {/* Left Column: Tutor visualizer & Transcript */}
                <div className="md:col-span-2 flex flex-col gap-6">
                    {/* Tutor Card */}
                    <div className="companion-section relative overflow-hidden backdrop-blur-md bg-card/60 border border-border/80 rounded-2xl flex flex-col items-center justify-center p-8 gap-6 shadow-md w-full min-h-[340px]">
                        {/* Ring based on connection status */}
                        <div 
                            className={cn(
                                "companion-avatar transition-all duration-500",
                                callStatus === CallStatus.ACTIVE && "ring-4 ring-emerald-500/35 border-emerald-500/50",
                                callStatus === CallStatus.CONNECTING && "ring-4 ring-amber-500/30 border-amber-500/50 animate-pulse"
                            )}
                            style={{ backgroundColor: `${subjColor}15`, borderColor: callStatus === CallStatus.ACTIVE ? undefined : `${subjColor}40` }}
                        >
                            {/* Static Icon */}
                            <div className={cn(
                                'absolute transition-opacity duration-700 size-32 flex items-center justify-center', 
                                callStatus === CallStatus.ACTIVE ? 'opacity-0 scale-90' : 'opacity-100 scale-100',
                                callStatus === CallStatus.CONNECTING && 'animate-pulse'
                            )}>
                                <Image 
                                    src={`/icons/${subject}.svg`} 
                                    alt={subject} 
                                    width={84} 
                                    height={84} 
                                    className="object-contain filter dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                                />
                            </div>

                            {/* Speech Lottie animation */}
                            <div className={cn(
                                'absolute transition-opacity duration-700', 
                                callStatus === CallStatus.ACTIVE ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                            )}>
                                <Lottie
                                    lottieRef={lottieRef}
                                    animationData={soundwaves}
                                    autoplay={false}
                                    className="companion-lottie"
                                />
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="font-extrabold text-2xl tracking-tight text-foreground flex items-center justify-center gap-2">
                                {name}
                                {callStatus === CallStatus.ACTIVE && (
                                    <span className="flex size-2 rounded-full bg-emerald-500 animate-ping" />
                                )}
                            </p>
                            <p className="text-sm font-semibold text-primary uppercase tracking-wider mt-1">{subject}</p>
                        </div>
                    </div>

                    {/* Transcript Deck */}
                    <div className="transcript border border-border/80 backdrop-blur-md bg-card/60 shadow-md w-full h-[380px]">
                        <div className="flex items-center gap-2 border-b border-border/40 pb-3 mb-2 shrink-0">
                            <Sparkles className="size-4 text-primary" />
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Live Lesson Log</span>
                        </div>
                        
                        <div className="transcript-message no-scrollbar pr-1 flex flex-col gap-4">
                            {messages.length > 0 ? (
                                messages.map((message, index) => {
                                    const isAssistant = message.role === 'assistant';
                                    return (
                                        <div 
                                            key={index}
                                            className={cn(
                                                "flex flex-col gap-1 w-full max-w-[75%]",
                                                isAssistant ? "self-start" : "self-end items-end"
                                            )}
                                        >
                                            <span className="text-[10px] font-bold text-muted-foreground/80 tracking-wide px-1">
                                                {isAssistant ? companionFirstName : "You"}
                                            </span>
                                            <div 
                                                className={cn(
                                                    "chat-bubble text-sm py-2 px-3.5 shadow-xs border",
                                                    isAssistant 
                                                        ? "chat-bubble-assistant bg-muted border-border/50 text-foreground" 
                                                        : "chat-bubble-user bg-primary border-primary/20 text-white dark:text-slate-900"
                                                )}
                                            >
                                                {message.content}
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center py-6 opacity-60">
                                    <p className="text-sm font-semibold text-muted-foreground">Start the session to view dynamic transcripts</p>
                                    <p className="text-xs text-muted-foreground/75 mt-0.5">Your conversation with {companionFirstName} will appear here in real-time</p>
                                </div>
                            )}
                        </div>

                        <div className="transcript-fade" />
                    </div>
                </div>

                {/* Right Column: Controls & Guidance */}
                <div className="flex flex-col gap-6 w-full">
                    {/* User profile details */}
                    <div className="user-avatar backdrop-blur-md bg-card/60 border border-border/80 rounded-2xl p-6 flex flex-col items-center gap-3 text-center shadow-md">
                        <div className="relative size-24 rounded-full overflow-hidden border-2 border-border shadow-inner">
                            <Image 
                                src={userImage} 
                                alt={userName} 
                                fill 
                                className="object-cover" 
                            />
                        </div>
                        <div>
                            <p className="font-bold text-lg text-foreground">{userName}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">Student Profile</p>
                        </div>
                    </div>

                    {/* Microphone Controls */}
                    <button 
                        className={cn(
                            "btn-mic backdrop-blur-md transition-all shadow-sm",
                            isMuted ? "bg-red-500/10 border-red-500/30 text-red-500" : "bg-card/60 text-foreground"
                        )}
                        onClick={toggleMicrophone} 
                        disabled={callStatus !== CallStatus.ACTIVE}
                    >
                        {isMuted ? (
                            <MicOff className="size-6 text-red-500 animate-pulse" />
                        ) : (
                            <Mic className="size-6 text-primary" />
                        )}
                        <p className="text-xs font-bold uppercase mt-1">
                            {isMuted ? 'Microphone Muted' : 'Microphone Active'}
                        </p>
                    </button>

                    {/* Start/Stop Controls */}
                    <button 
                        className={cn(
                            'rounded-xl py-3 px-4 font-bold text-sm tracking-wide cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 shadow-sm text-white', 
                            callStatus === CallStatus.ACTIVE ? 'bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 shadow-red-500/15' : 'bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 shadow-violet-500/15', 
                            callStatus === CallStatus.CONNECTING && 'from-amber-500 to-yellow-500 animate-pulse shadow-amber-500/15'
                        )} 
                        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                    >
                        {callStatus === CallStatus.ACTIVE ? (
                            <>
                                <PhoneOff className="size-4" />
                                <span>End Session</span>
                            </>
                        ) : callStatus === CallStatus.CONNECTING ? (
                            <span>Connecting...</span>
                        ) : (
                            <>
                                <Phone className="size-4" />
                                <span>Start Session</span>
                            </>
                        )}
                    </button>

                    {/* Tutor Starter Guide Card */}
                    <div className="border border-border/80 backdrop-blur-md bg-card/60 rounded-2xl p-6 shadow-md flex flex-col gap-4">
                        <div className="flex items-center gap-2 border-b border-border/40 pb-3">
                            <Sparkles className="size-4 text-primary animate-pulse" />
                            <h3 className="font-extrabold text-xs uppercase tracking-wider text-muted-foreground">Tutor Starter Guide</h3>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                            Not sure what to say? Try reading one of these starter prompts out loud to your tutor:
                        </p>
                        <div className="flex flex-col gap-2.5 mt-1">
                            {getStarterPrompts(subject).map((prompt, i) => (
                                <div 
                                    key={i} 
                                    className="text-xs font-bold p-3 rounded-xl bg-muted/40 hover:bg-primary/5 hover:border-primary/20 border border-border/50 transition-all cursor-pointer flex items-start gap-2.5 group"
                                    onClick={() => {
                                        navigator.clipboard.writeText(prompt);
                                    }}
                                    title="Click to copy prompt"
                                >
                                    <span className="text-primary font-extrabold text-[10px] bg-primary/10 border border-primary/20 size-5 flex items-center justify-center rounded-full shrink-0 group-hover:scale-105 transition-all">{i+1}</span>
                                    <span className="text-foreground/90 group-hover:text-primary transition-colors leading-normal">{prompt}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanionComponent;
