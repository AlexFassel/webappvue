 # Azure Security Guide
![Azure Security Guide](../images/00-azure-security-guide.png)

## Table of contents
  * [BYOK – Bring Your Own Key](#byok--bring-your-own-key)
    + [BYOK overview](#byok-overview)
    + [BYOK concept](#byok-concept)

## BYOK – Bring Your Own Key

As mentioned before in that document it is mission critical to protect information assets when storing the in an IT system – be it in the public cloud or on-premises. Managing Security is one of the most critical and challenging topics when using cloud based services. Amongst various security related topics, encrypting data at rest is one of the most important topics. It enhances the protection level against hackers, malicious insiders and state authorities. 

Proper key management is very important in this respect. Microsoft Azure provides different options for different service to encrypt data at rest. Bring your own key (BYOK) is one of the options to reach state of the art security in this respect. It can be used for certain services.
This chapter provides an overview and creates a basic understanding how BYOK works but also shows pitfalls and new risks when using that concept.
Be aware that BYOK only protects data when it gets stored and not while the data is in transit via network or processed in main memory and CPU.

###	BYOK overview

The following picture sketches the main components when using BYOK:

![BYOK Overview](../images/18-byok-overview.png)

The main components to implement BYOK are 2 High Security Modules (HSM) in the On-Premises data center and in the Cloud Provider data center. These are represented as the grey boxes on the picture. A HSM is a special hardware which is capable of creating keys in a bullet proof way not allowing to extract keys for unauthorized use or create duplicates of keys. Such hardware is built only for that purpose using proven technology designed for that. This is also testified by appropriate certifications.
You can compare this to using special keys for safe locks in contrast to using standard keys and locks for your garage at home. Creating keys for safe locks also requires more sophisticated tools and experience compared to creating standard keys for non-high secure environments.
An introduction to BYOK can be found at [LINK] and [LINK].

###	BYOK concept

The standard concept for using BYOK is to have multiple keys on multiple layers to implement encryption at rest. The key on the higher level then always protects the key on the next lower level.
The following picture shows, how this is typically layered:

![BYOK Layering Overview](../images/19-byok-layering-overview.png)

As the key on the higher level protects key(s) on the lower layered level means, that removing a key in higher level makes a key in a lower level useless. If a key on a higher gets removed, decryption of data is not possible anymore.
Depending on the service implementing BYOK, multiple keys are created on the lower level. Azure Storage and Azure Data Lake Store e.g. create BEKs for every 4 MB of data. This means that “only” 4 MB of data get lost if one of the BEKs gets compromised. Deleting the Wrapping Key e.g. means making all BEKs unusable.
You can compare this to throwing away the master key to unlock doors in a building which is needed to unlock any door. None of the doors can’t be opened anymore. In the case of BYOK it means that no data can be encrypted anymore. The flipside of this is – by intent – that the application does not work anymore until the master key gets restored again.
The master key on the picture is the Wrapping Key which gets generated upon the Key Exchange Key getting imported into Azure Key Vault.
