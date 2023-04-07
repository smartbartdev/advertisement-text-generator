import {useState} from 'react'
import {Configuration, OpenAIApi} from 'openai'
import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Container, Heading,
    Input,
    Select,
    Spacer,
    Stack,
    Text,
    Textarea
} from "@chakra-ui/react";

function AdvertisementGenerator() {
    const [platform, setPlatform] = useState('Online marketplace')
    const [language, setLanguage] = useState('English')
    const [terms, setTerms] = useState('')
    const [initialCompletionOutput, setInitialCompletionOutput] = useState('')
    const [regenerateCompletionOutput, setRegenerateCompletionOutput] = useState(initialCompletionOutput)
    const [openaikey, setOpenAiAPIKey] = useState('')

    const configuration = new Configuration({
        apiKey: openaikey,
    });

    const openai = new OpenAIApi(configuration)

    async function generateAdvertisement() {
        const response = await openai.createCompletion(
            {
                model: "text-davinci-003",
                prompt: `Generate a concise ${platform} advertisement text for "${terms}" in ${language}`,
                temperature: 0,
                max_tokens: 120,
            }
        )
        setInitialCompletionOutput(response.data.choices[0].text || "Nothing was generated.")
    }

    async function regenerateAdvertisement() {
        const response = await openai.createCompletion(
            {
                model: "text-davinci-003",
                prompt: `Regenerate the concise ${platform} advertisement text for "${terms}" in ${language}. The old text is: ${initialCompletionOutput}`,
                temperature: 0,
                max_tokens: 100,
            }
        )
        const output = response.data.choices[0].text || "Nothing was regenerated."
        setInitialCompletionOutput(output)
        setRegenerateCompletionOutput(output)
    }

    return (
        <Box
            minHeight={'100vh'}
            width={'100%'}>
            <Center>
                <Heading as={'h1'}>
                    AI powered advertisement text generator
                </Heading>
            </Center>
            <Container
                paddingTop={'20px'}
                bg={'whiteAlpha.50'}>
                <Box>
                    <Box>
                        <Text>Platform</Text>
                        <Select id="platform" value={platform} onChange={e => setPlatform(e.target.value)}>
                            <option value="Online marketplace">Online marketplace</option>
                            <option value="Facebook ad">Facebook ad</option>
                        </Select>
                    </Box>
                    <Box>
                        <Text>Language</Text>
                        <Select id="language" value={language} onChange={e => setLanguage(e.target.value)}>
                            <option value="English">English</option>
                            <option value="Nederlands">Nederlands</option>
                            <option value="Deutsch">Deutsch</option>
                        </Select>
                    </Box>
                    <Box>
                        <Text>Key words</Text>
                        <Input id="terms" type="text" value={terms} onChange={e => setTerms(e.target.value)}
                               placeholder={'Key words about the product'}/>
                    </Box>
                    <Box>
                        <Text>Generated text</Text>
                        <Textarea id="output" rows={24}
                                  value={regenerateCompletionOutput ? regenerateCompletionOutput.trim() : initialCompletionOutput.trim()}
                                  readOnly/>
                    </Box>
                    <Box
                        alignItems={'center'}
                        paddingTop={'5px'}>
                        <Stack direction={'row'} align={'center'}>
                            <Button
                                id={'generateButton'}
                                bg={'blue.500'}
                                color={'white'}
                                _hover={{bg: "blue.400"}}
                                variant={'solid'}
                                onClick={generateAdvertisement}>
                                Generate
                            </Button>
                            <Spacer/>
                            <Button
                                id={'regenerateButton'}
                                bg={'blue.500'}
                                color={'white'}
                                _hover={{bg: "blue.400"}}
                                variant={'solid'}
                                onClick={regenerateAdvertisement}>
                                Regenerate
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
            <Center paddingTop={'20px'}>
                <Box>
                    <Text align={'center'}>OpenAI API Key</Text>
                    <Input id="openaikey" type="password" value={openaikey} onChange={e => setOpenAiAPIKey(e.target.value)}
                           placeholder={'sk-...'}/>
                </Box>
            </Center>
        </Box>
    )
}

export default AdvertisementGenerator